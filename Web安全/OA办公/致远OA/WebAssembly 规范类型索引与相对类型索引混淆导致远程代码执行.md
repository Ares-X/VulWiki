---
source: "gelusus/wxvl 公众号漏洞文库"
title: "Chromium/V8 WebAssembly canonical/relative类型索引混淆"
product: "Chromium/V8 WebAssembly"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2024-12053"
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "声称Chrome131/132/133，134修复；需V8准确提交和sandbox链"
prerequisites: "浏览器执行恶意Wasm，RCE及沙箱逃逸是分层条件"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
identifier_role: "primary"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E8%87%B4%E8%BF%9COA/WebAssembly%20%E8%A7%84%E8%8C%83%E7%B1%BB%E5%9E%8B%E7%B4%A2%E5%BC%95%E4%B8%8E%E7%9B%B8%E5%AF%B9%E7%B1%BB%E5%9E%8B%E7%B4%A2%E5%BC%95%E6%B7%B7%E6%B7%86%E5%AF%BC%E8%87%B4%E8%BF%9C%E7%A8%8B%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C.md"
id: "vw-f7ab002da8aff0e29b6f2190"
entity_id: "ve-f7ab002da8aff0e29b6f2190"
schema_version: "1"
---

# Chromium/V8 WebAssembly canonical/relative类型索引混淆

## 条目说明

- 对象与具体问题：Chromium/V8 WebAssembly；canonical/relative类型索引混淆
- 版本、配置及部署条件：声称Chrome131/132/133，134修复；需V8准确提交和sandbox链
- 认证与权限前提：浏览器执行恶意Wasm，RCE及沙箱逃逸是分层条件
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 错分致远OA；不是WebAssembly标准本身通用漏洞，应定位V8实现
- 正文在AddRecursiveSingletonGroup函数签名中途截断，真正索引混淆触发/利用结尾未收录
- 大段C++/JS/WAT没有代码围栏且模板类型尖括号被吞/行粘连，难以重构
- CVE2024-12053与Chrome131–134、在野利用及issue361862752关联缺任何原始链接，需要优先核实，不能将未证链当已证

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

 幻泉之洲   2026-05-01 01:05  
  
>   
  
### 漏洞概述  
  
CVE-2024-12053 是一个WebAssembly类型混淆漏洞，由规范索引（canonical index）和相对索引（relative index）的混淆引发。Chromium团队指出，该漏洞已在野外被利用，配合沙箱逃逸技术（issue 361862752）实现了远程代码执行。  
>   
  
### 厂商回应  
  
Chrome build 134 中已经修复了这个CVE。  
### 来源  
- 漏洞分析：SSD Lab韩国团队 Aaron Cho  
### 受影响版本  
- Chrome build 133, 132, 131  
### 技术分析：CVE-2024-12053  
#### WebAssembly 类型规范化  
  
WebAssembly 用了一套类型系统来提升内存效率、保证类型安全。类型五花八门，各有各的用途。  
  
类型规范化的目标是把散落在多个 WebAssembly 模块中的相同类型合并到一处，统一管理，省事又高效。  
  
举个例子，WebAssembly 函数是按函数签名来区分的。一个接一个参数的和接两个参数的函数，就是不同的类型。  
  
/* src/codegen/signature.h:17-19 */// Describes the inputs and outputs of a function or call.template class Signature : public ZoneObject {  
  
/* src/wasm/value-type.h:1175-1176 */using FunctionSig = Signature;using CanonicalSig = Signature;  
  
V8 里的 Signature 类处理函数签名。每个 WebAssembly 函数都得在模块的类型段里声明自己的签名。  
  
;; test.wat(module  (func (param i32))  (func (param i32 i32))  (func (param i32 i32)))  
  
上面这个模块定义了三个空函数。第一个接一个 i32，后两个各接两个 i32。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/tbTbtBE6TibevsnqBMGXuAa3yuwFerhIXOhA5OO3yCNlGibuBsibAWRcxcNKvzEET11g3Yo2rMrbibvCXAmXfbVTteZEGsky92cicmkLx1Qk7Cdw/640?wx_fmt=png&from=appmsg "")  
  
▲ 第二个和第三个函数签名相同，所以在类型段里只定义一次。同样，跨多个模块出现相同类型也能合并成一个规范类型。  
  
/* src/wasm/canonical-types.h:41-52 */// A singleton class, responsible for isorecursive canonicalization of wasm// types.// A recursive group is a subsequence of types explicitly marked in the type// section of a wasm module. Identical recursive groups have to be canonicalized// to a single canonical group. Respective types in two identical groups are// considered identical for all purposes.// Two groups are considered identical if they have the same shape, and all// type indices referenced in the same position in both groups reference:// - identical types, if those do not belong to the rec. group,// - types in the same relative position in the group, if those belong to the// rec. group.class TypeCanonicalizer {  
  
类型规范化由 TypeCanonicalizer 这个单例类管理——运行时只有一个实例。类的注释写着它负责把相同的递归组规范化。在 WebAssembly 里，递归组就是一组类型。只有一个类型的递归组叫递归单例组。不在任何递归组里的单个类型，规范时也当成递归单例组处理。  
  
TypeCanonicalizer 在 V8 初始化时构造。  
  
/* src/wasm/canonical-types.cc:22 */TypeCanonicalizer::TypeCanonicalizer() { AddPredefinedArrayTypes(); }  
  
构造函数调用了 AddPredefinedArrayTypes()。  
  
/* src/wasm/canonical-types.h:54-56 */  static constexpr CanonicalTypeIndex kPredefinedArrayI8Index{0};  static constexpr CanonicalTypeIndex kPredefinedArrayI16Index{1};  static constexpr uint32_t kNumberOfPredefinedTypes = 2;  
  
/* src/wasm/canonical-types.cc:191-211 */void TypeCanonicalizer::AddPredefinedArrayTypes() {  static constexpr std::pair    kPredefinedArrayTypes[] = {{kPredefinedArrayI8Index, {kWasmI8}},                                                {kPredefinedArrayI16Index, {kWasmI16}}};  for (auto [index, element_type] : kPredefinedArrayTypes) {    DCHECK_EQ(index.index, canonical_singleton_groups_.size());    CanonicalSingletonGroup group;    static constexpr bool kMutable = true;    // TODO(jkummerow): Decide whether this should be final or nonfinal.    static constexpr bool kFinal = true;    static constexpr bool kShared = false;  // TODO(14616): Fix this.    static constexpr bool kNonRelativeSupertype = false;    CanonicalArrayType* type =      zone_.New(element_type, kMutable);    group.type = CanonicalType(type, CanonicalTypeIndex{kNoSuperType}, kFinal,                                  kShared, kNonRelativeSupertype);    canonical_singleton_groups_.emplace(group, index);    canonical_supertypes_.emplace_back(CanonicalTypeIndex{kNoSuperType});    DCHECK_LE(canonical_supertypes_.size(), kMaxCanonicalTypes);  }}  
  
![](https://mmbiz.qpic.cn/mmbiz_png/tbTbtBE6TibdF4aThc02lZZC2gpGSBTLm35KucNWLia4nIRSaJxWMvDcyt1JLFMEDicTcfOcKxeACVv7IctmwYh0xdyAUTzmdExdHgrw2xrxL8/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/tbTbtBE6Tibc79HV6zTS6YV3TJ3slPRgtg8KVmLnIC2TibvELWicvCYl82wpuBjrZ609xIFQQvdqO8lnCa85ew7495nicpYPvUh21KHoaBEukOQ/640?wx_fmt=png&from=appmsg "")  
  
AddPredefinedArrayTypes() 往 canonical_singleton_groups_ 里加了一些默认的规范类型。有两个预定义类型，索引分别是 0 和 1。  
  
下一个规范类型是在创建 context 时由 WasmJs::Install() 加进去的。  
  
/* src/wasm/wasm-js.cc:3207-3212 */constexpr wasm::ValueType kWasmExceptionTagParams[] = {    wasm::kWasmExternRef,};constexpr wasm::FunctionSig kWasmExceptionTagSignature{  0, arraysize(kWasmExceptionTagParams), kWasmExceptionTagParams};}  // namespace  
  
/* src/wasm/wasm-js.cc:3475-3483 */    // Reset the JSTag's canonical_type_index based on this Isolate's    // type_canonicalizer.    DirectHandle js_tag_object(      Cast(native_context->wasm_js_tag()), isolate);    js_tag_object->set_canonical_type_index(      wasm::GetWasmEngine()          ->type_canonicalizer()          ->AddRecursiveGroup(&kWasmExceptionTagSignature)          .index);  
  
WasmJs::Install() 把 js_tag_object 的签名规范化了。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/tbTbtBE6TibdiboEibNBtG4WibhsicjzRFMFz8mLUpDyaGJeGpV4OFgVG0dKTIzpInEHXtqoJZXYyFyibstekmKxZORrechNtcsPBn4Nmg6RMS0SI/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_png/tbTbtBE6TibeCt05mUrohl8S5kzTvyGmWdVfm8uEgO5OhJ0mVicZUuPS4HXCXStOkiadib65A6FahGd1JMZAIuye1MicPySBkpNicsBjHKbBmCUibc/640?wx_fmt=png&from=appmsg "")  
  
这种情况下类型是函数签名，所以同时加到了 canonical_singleton_groups_ 和 canonical_function_sigs_ 里。加到 canonical_function_sigs_ 时，索引和 canonical_singleton_groups_ 里的一样，即使这是加进去的第一个函数签名。所以 canonical_function_sigs_ 的前两个槽位是空的。  
#### 规范化递归单例组  
  
d8.file.execute("v8/test/mjsunit/wasm/wasm-module-builder.js");let builder = new WasmModuleBuilder();// recursive singleton groupbuilder.startRecGroup();let type = builder.nextTypeIndex();builder.addType(makeSig([], [wasmRefType(type)]));builder.endRecGroup();builder.instantiate();  
  
这段 JavaScript 定义了一个 WebAssembly 模块，里面有一个递归单例组，函数签名没有参数，返回值是一个指向自身的引用类型。实例化时，解码类型段由 ModuleDecoderImpl::DecodeTypeSection() 处理。  
  
/* src/wasm/wasm-limits.h:29 */constexpr size_t kV8MaxWasmTypes = 1'000'000;  
  
/* src/wasm/module-decoder-impl.h:625-627 */  void DecodeTypeSection() {    TypeCanonicalizer* type_canon = GetTypeCanonicalizer();    uint32_t types_count = consume_count("types count", kV8MaxWasmTypes);  
  
types_count 是递归组的个数，不是单独类型的个数，不能超过 kV8MaxWasmTypes。  
  
/* src/wasm/wasm-constants.h:65 */constexpr uint8_t kWasmRecursiveTypeGroupCode = 0x4e;  
  
/* src/wasm/module-decoder-impl.h:629-662 */    for (uint32_t i = 0; ok() && i < types_count; i++) {      if (tracer_) tracer_->TypeOffset(pc_ - start_);      uint8_t kind = read_u8(pc(), "type kind");      size_t initial_size = module_->types.size();      if (kind == kWasmRecursiveTypeGroupCode) {        module_->is_wasm_gc = true;        uint32_t rec_group_offset = pc_offset();        consume_bytes(1, "rec. group definition", tracer_);        if (tracer_) tracer_->NextLine();        uint32_t group_size =          consume_count("recursive group size", kV8MaxWasmTypes);        if (tracer_) tracer_->RecGroupOffset(rec_group_offset, group_size);        if (initial_size + group_size > kV8MaxWasmTypes) {          errorf(pc(), "Type definition count exceeds maximum %zu",                kV8MaxWasmTypes);          return;        }        // We need to resize types before decoding the type definitions in this        // group, so that the correct type size is visible to type definitions.        module_->types.resize(initial_size + group_size);        module_->isorecursive_canonical_type_ids.resize(initial_size +                                                  group_size);        for (uint32_t j = 0; j < group_size; j++) {          if (tracer_) tracer_->TypeOffset(pc_offset());          TypeDefinition type = consume_subtype_definition(initial_size + j);          module_->types[initial_size + j] = type;        }        if (failed()) return;        type_canon->AddRecursiveGroup(module_.get(), group_size);        if (tracer_) {          tracer_->Description("end of rec. group");          tracer_->NextLine();        }      } else {  
  
builder.startRecGroup(); 把组类型设为 kWasmRecursiveTypeGroupCode。这时类型由 TypeCanonicalizer::AddRecursiveGroup() 处理。  
  
/* src/wasm/canonical-types.cc:30-41 */void TypeCanonicalizer::AddRecursiveGroup(WasmModule* module, uint32_t size) {  AddRecursiveGroup(module, size,                        static_cast(module->types.size() - size));}void TypeCanonicalizer::AddRecursiveGroup(WasmModule* module, uint32_t size,                                  uint32_t start_index) {  if (size == 0) return;  // If the caller knows statically that {size == 1}, it should have called  // {AddRecursiveSingletonGroup} directly. For cases where this is not  // statically determined we add this dispatch here.  if (size == 1) return AddRecursiveSingletonGroup(module, start_index);  
  
递归单例组只有一个类型，所以 AddRecursiveGroup() 调用了 AddRecursiveSingletonGroup()。  
  
/* src/wasm/canonical-types.cc:104-111 */void TypeCanonicalizer::AddRecursiveSingletonGroup(WasmModule* module,                                                uint32_t start_index) {  base::MutexGuard guard(&mutex_);  DCHECK_GT(module->types.size(), start_index);  CanonicalTypeIndex canonical_index = AddRecursiveGroup(      CanonicalizeTypeDef(module, module->types[start_index], start_index));  module->isorecursive_canonical_type_ids[start_index] = canonical_index;}  
  
AddRecursiveSingletonGroup() 调用 CanonicalizeTypeDef() 为该类型创建一个 TypeCanonicalizer::CanonicalType 对象。  
  
/* src/wasm/canonical-types.cc:271-310 */  switch (type.kind) {    case TypeDefinition::kFunction: {      const FunctionSig* original_sig = type.function_sig;      CanonicalSig::Builder builder(&zone_, original_sig->return_count(),                                            original_sig->parameter_count());      for (ValueType ret : original_sig->returns()) {        builder.AddReturn(          CanonicalizeValueType(module, ret, recursive_group_start));      }      for (ValueType param : original_sig->parameters()) {        builder.AddParam(          CanonicalizeValueType(module, param, recursive_group_start));      }      return CanonicalType(builder.Get(), supertype, type.is_final,                          type.is_shared, is_relative_supertype);    }    case TypeDefinition::kStruct: {      const StructType* original_type = type.struct_type;      CanonicalStructType::Builder builder(&zone_,                                            original_type->field_count());      for (uint32_t i = 0; i < original_type->field_count(); i++) {        builder.AddField(CanonicalizeValueType(module, original_type->field(i),                                                    recursive_group_start),                            original_type->mutability(i),                            original_type->field_offset(i));      }      builder.set_total_fields_size(original_type->total_fields_size());      return CanonicalType(        builder.Build(CanonicalStructType::Builder::kUseProvidedOffsets),        supertype, type.is_final, type.is_shared, is_relative_supertype);    }    case TypeDefinition::kArray: {      CanonicalValueType element_type = CanonicalizeValueType(        module, type.array_type->element_type(), recursive_group_start);      CanonicalArrayType* array_type = zone_.New(        element_type, type.array_type->mutability());      return CanonicalType(array_type, supertype, type.is_final, type.is_shared,                                    is_relative_supertype);    }  }  
  
CanonicalizeTypeDef() 会为所有用到的类型调用 CanonicalizeValueType()。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/tbTbtBE6Tibe4ibQibPohj1BUFy4wrdPNaKGSjnl1CMQgQ7x3sHJ0DIbhNyS6iaVha6H0uWiaLUFxABv7dib4mfQMH9XdJlvYia12dgCHdiaYcFutVo/640?wx_fmt=png&from=appmsg "")  
  
/* src/wasm/value-type.h:642-644 */  constexpr bool has_index() const {    return is_rtt() || (is_object_reference() && heap_type().is_index());  }  
  
/* src/wasm/canonical-types.cc:213-216 */CanonicalValueType TypeCanonicalizer::CanonicalizeValueType(    const WasmModule* module, ValueType type,    uint32_t recursive_group_start) const {  if (!type.has_index()) return CanonicalValueType{type};  
  
CanonicalizeValueType() 在 type.has_index() 为 false 时直接返回 CanonicalValueType{type}。has_index() 在类型是 RTT 或引用了其他堆类型时返回 true。  
  
/* src/wasm/canonical-types.cc:218-222 */  return type.ref_index().index >= recursive_group_start              ? CanonicalValueType::WithRelativeIndex(                  type.kind(), type.ref_index().index - recursive_group_start)              : CanonicalValueType::FromIndex(                  type.kind(), module->canonical_type_id(type.ref_index()));  
  
type.ref_index().index >= recursive_group_start 表示类型引用了同一个递归组里的另一个类型。这时可以用相对索引，所以 CanonicalizeValueType() 通过 CanonicalValueType::WithRelativeIndex() 返回了一个 CanonicalValueType 对象。  
  
/* src/wasm/value-type.h:1059-1064 */  static constexpr CanonicalValueType WithRelativeIndex(ValueKind kind,                                                uint32_t index) {    return CanonicalValueType{        ValueTypeBase(KindField::encode(kind) | HeapTypeField::encode(index) |                    CanonicalRelativeField::encode(true))};  }  
  
  
CanonicalValueType::WithRelativeIndex() 把 KindField 设为 kind，HeapTypeField 设为 index，CanonicalRelativeField 设为 true——表示这个索引是递归组内的相对索引。然后创建并返回 CanonicalValueType 对象。  
  
/* src/wasm/canonical-types.cc:104-111 */void TypeCanonicalizer::AddRecursiveSingletonGroup(WasmModule* module,                                                uint32_t start_index) {  base::MutexGuard guard(&mutex_);  DCHECK_GT(module->types.size(), start_index);  CanonicalTypeIndex canonical_index = AddRecursiveGroup(      CanonicalizeTypeDef(module, module->types[start_index], start_index));  module->isorecursive_canonical_type_ids[start_index] = canonical_index;}  
  
CanonicalizeTypeDef() 返回的 CanonicalType 对象被传给 AddRecursiveGroup()。  
  
```cpp
/* src/wasm/canonical-types.cc:151-181 */CanonicalTypeIndex TypeCanonicalizer::AddRecursiveGroup(CanonicalType type) {  DCHECK(!mutex_.TryLock());  // The caller must hold the mutex.  CanonicalSingletonGroup group{type};  if (CanonicalTypeIndex index = FindCanonicalGroup(group); index.valid()) {    // Make sure this signature can be looked up later.    DCHECK_IMPLIES(type.kind == CanonicalType::kFunction,                          canonical_function_sigs_.count(index));    return index;  }  static_assert(kMaxCanonicalTypes < (1 << CanonicalTypeIndex::kBits));  CanonicalTypeIndex index(canonical_singleton_groups_.size());  // Check that this canonical ID is not used yet.  DCHECK(std::none_of(canonical_singleton_groups_.begin(),                              canonical_singleton_groups_.end(),                              [=](auto& entry) { return entry.second == index; }));  DCHECK(std::none_of(canonical_groups_.begin(), canonical_groups_.end(),                              [=](auto& entry) { return entry.second == index; }));  canonical_singleton_groups_.emplace(group, index);  // Compute the canonical index of the supertype: If it is relative, we  // need to add {canonical_index}.  canonical_supertypes_.push_back(      type.is_relative_supertype          ? CanonicalTypeIndex{type.supertype.index + index.index}          : type.supertype);  if (type.kind == CanonicalType::kFunction) {    const CanonicalSig* sig = type.function_sig;    CHECK(canonical_function_sigs_.emplace(index, sig).second);  }  CheckMaxCanonicalIndex();  return index;}  
```

> 归档说明：上方源码在原归档中已压成单行，含 `//` 注释，不能作为完整可直接编译的代码；这里仅修正字面量显示，未猜补换行。
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/tbTbtBE6TibcSzFInsJagicbiaYiccHOPndlDo5ruOx5g911r0UmaRuts1FtJYtUJIhYvV5BJCcGH5POGtuYuozFJvdfCyVVxLOW2f8eL08yORM/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_png/tbTbtBE6TibciadtIK6KibphD6EeZjicyAzVQqsVlk4HxzHGfmwmzsf7UJrRqcaBK2qar1RRX1DWAQuNheXmFBgyyia2TlFEeECFLykexIU2bicibI/640?wx_fmt=png&from=appmsg "")  
  
AddRecursiveGroup() 创建一个包含该类型的单例组，加到 canonical_singleton_groups_。如果类型是函数签名，同时加到 canonical_function_sigs_。  
#### 规范化单个类型  
  
/* src/wasm/wasm-constants.h:58-65 */// Binary encoding of type definitions.constexpr uint8_t kSharedFlagCode = 0x65;constexpr uint8_t kWasmFunctionTypeCode = 0x60;constexpr uint8_t kWasmStructTypeCode = 0x5f;constexpr uint8_t kWasmArrayTypeCode = 0x5e;constexpr uint8_t kWasmSubtypeCode = 0x50;constexpr uint8_t kWasmSubtypeFinalCode = 0x4f;constexpr uint8_t kWasmRecursiveTypeGroupCode = 0x4e;  
  
在 ModuleDecoderImpl::DecodeTypeSection() 中，如果没有 builder.startRecGroup();，kind 就设为上面的类型定义之一。  
  
d8.file.execute("v8/test/mjsunit/wasm/wasm-module-builder.js");let builder = new WasmModuleBuilder();// single type (treated similarly to recursive singleton group)let type = builder.nextTypeIndex();builder.addType(makeSig([], [wasmRefType(type)]));builder.instantiate();  
  
这里类型是函数签名，所以 kind 设为 kWasmFunctionTypeCode。  
  
/* src/wasm/module-decoder-impl.h:662-677 */      } else {        if (tracer_) tracer_->TypeOffset(pc_offset());        if (initial_size + 1 > kV8MaxWasmTypes) {          errorf(pc(), "Type definition count exceeds maximum %zu",                kV8MaxWasmTypes);          return;        }        // Similarly to above, we need to resize types for a group of size 1.        module_->types.resize(initial_size + 1);        module_->isorecursive_canonical_type_ids.resize(initial_size + 1);        TypeDefinition type = consume_subtype_definition(initial_size);        if (ok()) {          module_->types[initial_size] = type;          type_canon->AddRecursiveSingletonGroup(module_.get());        }      }  
  
kind 不是 kWasmRecursiveTypeGroupCode，所以 DecodeTypeSection() 直接调用了 AddRecursiveSingletonGroup()。  
  
/* src/wasm/canonical-types.cc:99-111 */void TypeCanonicalizer::AddRecursiveSingletonGroup(WasmModule* module) {  uint32_t start_index = static_cast(module->types.size() - 1);  return AddRecursiveSingletonGroup(module, start_index);}void TypeCanonicalizer::AddRecursiveSingletonGroup(WasmModule* module,                                                 
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
