<template>
    
    <Table highlight-row stripe border :columns="columns2" :data="data1" @on-current-change="showTable"></Table>

</template>
<script>
    export default {
        data () {
            return {
                columns2: [
                    {
                        title: ' ',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: ' ',
                        key: 'address'
                    }
                ],
                data1: [
                    {
                        name: 'John Brown',
                        age: 18,
                        department: 'New York',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        department: 'London',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        department: 'Sydney',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: '',
                        department: 'Ottawa',
                        date: '2016-10-04'
                    }
                ]
            }
        },
        methods:{
            showTable:function(el){
                this.$router.push({
                    name:'reportOperation',
                    params:{
                        tableId:el.age
                    }
                })
            }
        }
    }
</script>