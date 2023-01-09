<!--
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
-->
<template>
    <div class="content">
        <a-table :columns="columns" :data-source="data">
            <template #headerCell="{ column }">
                <template v-if="column.key === 'name'">
                    <span>
                        <smile-outlined />
                        Name
                    </span>
                </template>
            </template>

            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'name'">
                    <a>
                        {{ record.name }}
                    </a>
                </template>
                <template v-else-if="column.key === 'tags'">
                    <span>
                        <a-tag v-for="tag in record.tags" :key="tag"
                            :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'">
                            {{ tag.toUpperCase() }}
                        </a-tag>
                    </span>
                </template>
                <template v-else-if="column.key === 'action'">
                    <span>
                        <a>Invite 一 {{ record.name }}</a>
                        <a-divider type="vertical" />
                        <a>Delete</a>
                        <a-divider type="vertical" />
                        <a class="ant-dropdown-link">
                            More actions
                            <down-outlined />
                        </a>
                    </span>
                </template>
            </template>
        </a-table>
        <a-table sticky :columns="columns2" :data-source="data2" :scroll="{ x: 1500 }">
            <template #bodyCell="{ column }">
                <template v-if="column.key === 'operation'"><a>action</a></template>
            </template>
            <template #summary>
                <a-table-summary :fixed="fixedTop ? 'top' : 'bottom'">
                    <a-table-summary-row>
                        <a-table-summary-cell :index="0" :col-span="2">
                            <a-switch v-model:checked="fixedTop" checked-children="Fixed Top"
                                un-checked-children="Fixed Top"></a-switch>
                        </a-table-summary-cell>
                        <a-table-summary-cell :index="2" :col-span="8">Scroll Context</a-table-summary-cell>
                        <a-table-summary-cell :index="10">Fix Right</a-table-summary-cell>
                    </a-table-summary-row>
                </a-table-summary>
            </template>
        </a-table>
    </div>

</template>
<script>
    import {
        SmileOutlined,
        DownOutlined
    } from '@ant-design/icons-vue';
    import {
        defineComponent
    } from 'vue';
    const columns = [{
        name: 'Name',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    }, {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    }, {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
    }, {
        title: 'Action',
        key: 'action',
    }];
    const data = [{
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    }, {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    }, {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    }];

    const columns2 = [{
      title: 'Full Name',
      width: 100,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
    }, {
      title: 'Age',
      width: 100,
      dataIndex: 'age',
      key: 'age',
      fixed: 'left',
    }, {
      title: 'Column 1',
      dataIndex: 'address',
      key: '1',
      width: 150,
    }, {
      title: 'Column 2',
      dataIndex: 'address',
      key: '2',
      width: 150,
    }, {
      title: 'Column 3',
      dataIndex: 'address',
      key: '3',
      width: 150,
    }, {
      title: 'Column 4',
      dataIndex: 'address',
      key: '4',
      width: 150,
    }, {
      title: 'Column 5',
      dataIndex: 'address',
      key: '5',
      width: 150,
    }, {
      title: 'Column 6',
      dataIndex: 'address',
      key: '6',
      width: 150,
    }, {
      title: 'Column 7',
      dataIndex: 'address',
      key: '7',
      width: 150,
    }, {
      title: 'Column 8',
      dataIndex: 'address',
      key: '8',
    }, {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 100,
    }]
    const data2 = [];
    for (let i = 0; i < 100; i++) {
        data2.push({
        key: i,
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
      });
    }
    export default defineComponent({
        components: {
            SmileOutlined,
            DownOutlined,
        },
        setup() {
            return {
                data,
                columns,
                data2,
                columns2,
                fixedTop: false,
            };
        },
    });
</script>