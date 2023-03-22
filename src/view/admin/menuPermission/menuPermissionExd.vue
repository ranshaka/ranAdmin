<template>
    <div style="padding-top: 12px;font-weight: bold;">节点分配
    </div>
    <a-transfer :data-source="dataSource" :target-keys="targetKeys" :render="item => item.title"
        :show-select-all="false" @change="onChange" >
        <template #children="{ direction, selectedKeys, onItemSelect }">
            <template v-if="direction==='left'">
                <a-input-search v-model:value="searchValue" style="margin-bottom: 8px" placeholder="Search" />
                <a-tree v-if="leftTreeData.length" blockNode checkable :tree-data="leftTreeData" 
                    :checked-keys="leftCheckedKey" :expandedKeys="expandedKeys" :auto-expand-parent="autoExpandParent"
                    @check="(_, props) => { handleLeftChecked(_, props, [...selectedKeys, ...targetKeys], onItemSelect) }"
                    @expand="onExpand">
                    <template #title="{ title }">
                        <!-- {{title }} -->
                        <span v-if="title.indexOf(searchValue) > -1">
                            {{ title.substr(0, title.indexOf(searchValue)) }}
                            <span style="color: #f50">{{ searchValue }}</span>
                            {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
                        </span>
                        <span v-else>{{ title }}</span>
                    </template>
                </a-tree>
                <a-empty v-else>
                    <template #description>暂无数据</template>
                </a-empty>
            </template>
            <template v-else-if="direction==='right'">
                <a-tree v-if="rightTreeData.length" blockNode checkable defaultExpandAll :tree-data="rightTreeData"
                    v-model:checked-keys="rightCheckedKey" v-model:expanded-keys="rightExpandedKey"
                    @check="(_, props) => { handleRightChecked(_, props, [...selectedKeys, ...targetKeys], onItemSelect) }" />
                <a-empty v-else>
                    <template #description>暂无数据</template>
                </a-empty>
            </template>
        </template>
    </a-transfer>
</template>

<script>
    import {
        defineComponent,
        PropType
    } from 'vue'
    import {
        cloneDeep,
        flatten,
        getDeepList,
        getTreeKeys,
        handleLeftTreeData,
        handleRightTreeData,
        isChecked,
        uniqueTree
    } from '@/utils'

    export default defineComponent({
        name: 'OptionsTransfer',
        props: {
            /** 树数据 */
            treeData: {
                type: Array,
                default: () => []
            },
            /** 编辑 key */
            editKey: {
                type: Array,
                default: () => []
            },
            /** 编辑 key */
            userid: {
                type: String,
                default: () => ''
            }
        },
        data() {
            return {
                searchValue: '',

                targetKeys: [], // 显示在右侧框数据的 key 集合
                dataSource: [], // 数据源，其中的数据将会被渲染到左边一栏

                leftCheckedKey: [], // 左侧树选中 key 集合
                leftHalfCheckedKeys: [], // 左侧半选集合
                leftCheckedAllKey: [], // 左侧树选中的 key 集合，包括半选与全选
                leftTreeData: [], // 左侧树
                expandedKeys: [], // 左侧树

                rightCheckedKey: [], // 右侧树选中集合
                rightCheckedAllKey: [], // 右侧树选中集合，包括半选与全选
                rightExpandedKey: [], // 右侧展开数集合
                rightTreeData: [], // 右侧树
                autoExpandParent: false,
                emitKeys: [], // 往父级组件传递的数据

                deepList: [] // 深层列表
            }
        },
        watch: {

            searchValue: {
                handler(val) {
                    if (val) {
                        const expanded = this.dataSource
                            .map(item => {
                                if (item.nodeName.indexOf(val) > -1) {
                                    return this.getParentKey(item.key, this.dataSource);
                                }

                                return null;
                            })
                            .filter((item, i, self) => item && self.indexOf(item) === i);
                        this.expandedKeys = expanded;
                        this.searchValue = val;
                        this.autoExpandParent = true;
                    } else {
                        this.expandedKeys = [];
                    }

                }
            },
            // treeData: {
            //     deep: true,
            //     handler(val) {
            //         this.processTreeData()
            //     }
            // },
            // editKey: {
            //     deep: true,
            //     handler(val) {
            //         this.processTreeData()
            //     }
            // },
            userid: {
                deep: true,
                handler(val) {
                    this.processTreeData()
                }
            }
        },
        created() {
            this.processTreeData()
        },
        methods: {
            onExpand(keys) {
                this.expandedKeys = keys;
                this.autoExpandParent = false;
            },
            getParentKey(key, tree) {
                let parentKey;

                for (let i = 0; i < tree.length; i++) {
                    const node = tree[i];

                    if (node.children) {
                        if (node.children.some(item => item.key === key)) {
                            parentKey = node.key;
                        } else if (this.getParentKey(key, node.children)) {
                            parentKey = this.getParentKey(key, node.children);
                        }
                    }
                }

                return parentKey;
            },
            onSearch() {

            },
            // 处理树数据
            processTreeData() {
                this.dataSource = []
                this.targetKeys = []

                this.leftCheckedKey = [] // 左侧树选中 key 集合
                this.leftHalfCheckedKeys = [] // 左侧半选集合
                this.leftCheckedAllKey = [] // 左侧树选中的 key 集合，包括半选与全选
                this.leftTreeData = [] // 左侧树

                this.rightCheckedKey = [] // 右侧树选中集合
                this.rightCheckedAllKey = [] // 右侧树选中集合，包括半选与全选
                this.rightExpandedKey = [] // 右侧展开数集合
                this.rightTreeData = [] // 右侧树
                flatten(cloneDeep(this.treeData), this.dataSource)
                if (this.editKey.length) {
                    this.processEditData()
                } else {
                    this.leftTreeData = handleLeftTreeData(cloneDeep(this.treeData), this.leftCheckedKey)
                }
            },
            // 处理编辑数据
            processEditData() {
                this.leftCheckedAllKey = this.editKey
                this.rightExpandedKey = this.editKey
                this.targetKeys = this.editKey

                this.rightTreeData = handleRightTreeData(cloneDeep(this.treeData), this.editKey)

                getDeepList(this.deepList, this.treeData)
                this.leftCheckedKey = uniqueTree(this.editKey, this.deepList)
                this.leftHalfCheckedKeys = this.leftCheckedAllKey.filter(item => this.leftCheckedKey.indexOf(
                    item) === -1)
                this.leftTreeData = handleLeftTreeData(cloneDeep(this.treeData), this.leftCheckedKey)

                this.emitKeys = this.rightExpandedKey
            },
            // 穿梭更改
            onChange(targetKeys, direction) {
                console.log(direction)
                if (direction === 'right') {
                    this.targetKeys = this.leftCheckedAllKey
                    this.rightCheckedKey = []
                    this.rightTreeData = handleRightTreeData(cloneDeep(this.treeData), this.leftCheckedAllKey,
                        'right')
                    this.leftTreeData = handleLeftTreeData(cloneDeep(this.treeData), this.leftCheckedKey,
                        'right')
                } else if (direction === 'left') {
                    this.rightTreeData = handleRightTreeData(this.rightTreeData, this.rightCheckedKey, 'left')
                    this.leftTreeData = handleLeftTreeData(this.leftTreeData, this.rightCheckedKey, 'left')
                    this.leftCheckedKey = this.leftCheckedKey.filter(item => this.rightCheckedKey.indexOf(
                        item) === -1)
                    this.targetKeys = this.targetKeys.filter(item => this.rightCheckedKey.indexOf(item) === -1)
                    this.leftHalfCheckedKeys = this.leftHalfCheckedKeys.filter(item => this.rightCheckedKey
                        .indexOf(item) === -1)
                    this.rightCheckedKey = []
                }
                this.rightExpandedKey = getTreeKeys(this.rightTreeData)
                this.emitKeys = this.rightExpandedKey
            },
            // 左侧选择
            handleLeftChecked(_, {
                node,
                halfCheckedKeys
            }, checkedKeys, itemSelect) {
                this.leftCheckedKey = _
                this.leftHalfCheckedKeys = [...new Set([...this.leftHalfCheckedKeys, ...halfCheckedKeys])]
                this.leftCheckedAllKey = [...new Set([...this.leftHalfCheckedKeys, ...halfCheckedKeys, ..._])]
                const {
                    eventKey
                } = node
                itemSelect(eventKey, !isChecked(checkedKeys, eventKey))
            },
            // 右侧选择
            handleRightChecked(_, {
                node,
                halfCheckedKeys
            }, checkedKeys, itemSelect) {
                this.rightCheckedKey = _
                this.rightCheckedAllKey = [...halfCheckedKeys, ..._]
                const {
                    eventKey
                } = node
                itemSelect(eventKey, isChecked(_, eventKey))
            }
        }
    })
</script>

<style scoped lang="less">
    ::v-deep.ant-transfer {
        margin-top: 16px !important;

        .ant-transfer-list {
            height: 710px !important;
            overflow: auto !important;
            width: 455px !important;
        }

    }
</style>