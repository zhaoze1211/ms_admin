<template>
    <div>
		<div class="float-left">
    		<r-button type="primary" @click.native='toUpdate'>刷新</r-button>
            <r-button type="primary" @click.native='addProduct'>添加商品</r-button>
    	</div>
    	<div class="float-right xv-block">
    		<div class="float-left">
    			<r-input v-model="goodsName" placeholder="商品名称" :maxlength='20'></r-input>
    			
    		</div>
			<div class="float-right mg-left">
				<r-button type="primary" icon="search" @click.native='toSearch'>搜索</r-button>
			</div>
    	</div>
    	<div class="xv-block">
    		<r-table
			    :data="tableData"
			    border
			    style="width: 100%"
			    @selection-change="handleSelectionChange">
			    <r-table-column
			      type="selection"
			      width="55">
			    </r-table-column>
			    <r-table-column
			      inline-template
			      label="商品"
			      width="120">
			      <div>{{ row.name }}</div>
			    </r-table-column>
			    <r-table-column
			      prop="tag_price"
			      label="价格"
			      width="120">
			    </r-table-column>
			    <r-table-column
			      inline-template
			      label="库存">
			      <div v-for='item in row.skus'>{{ item.stock }}</div>
			    </r-table-column>
			    <r-table-column
			      inline-template
			      label="商品状态">
			      <div v-for='item in row.skus' :style="{color: item.stock <= 0 ?'#FF6C60':'#339900'}">
			      	{{ item.stock <= 0 ? '已售罄' : '销售中' }}
			      </div>
			    </r-table-column>
			    <r-table-column
			      inline-template
			      :context="_self"
			      fixed="right"
			      label="操作"
			      width="120">
			      <span>
			        <r-button 
			        	type="success" 
			        	icon="edit" 
			        	size='mini'
			        	@click.native.prevent="edit(row.id,$index)">
			        </r-button>
			        <r-button
			          @click.native.prevent="del(row.id,$index)"
			          type="primary"
			          icon="delete"
			          size="mini">
			        </r-button>
			      </span>
			    </r-table-column>
			  </r-table>
    	</div>
    	<div class="float-left">
    		<r-button @click.native='toDeleteList' :disabled='DelbtnDisabled'>批量删除</r-button>
            <r-button @click.native='toAddClassify' :disabled='DelbtnDisabled'>添加到分类</r-button>
    	</div>
    	<div class="float-right xv-block" v-if='total>0'>
    		<el-pagination 
    			@size-change="handleSizeChange"
    			@current-change="handleCurrentChange" 
    			:current-page="params.pageNumber"
                layout="total, sizes, prev, pager, next, jumper" 
                :total="total" 
                :page-size="params.pageSize">
            </el-pagination>
    	</div>
    	<el-dialog title="商品删除" v-model="delDialogVisible" size="tiny">
	      <span>删除后商品无法恢复，确认删除？</span>
	      <span slot="footer" class="dialog-footer">
	      	<r-button @click="delDialogVisible = false">取 消</r-button>
	      	<r-button type="primary" @click="toDel">确 定</r-button>
	    	</span>
	    </el-dialog>
	    <el-dialog title="分类列表" v-model="classifyDialogVisible" size="tiny" @close='toCloseD'>
	      <r-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			
			<r-form-item label="分类名称" prop="region" required>
			  <r-select v-model="ruleForm.region" placeholder="请选择分类">
			    <r-option :label="item.name" :value="item" v-for='item in classifyArr'></r-option>
			  </r-select>
			  <div class="el-form-item__error">{{msgError1}}</div>
			</r-form-item>
		  </r-form>
	      <span slot="footer" class="dialog-footer">
	      	<r-button type="primary" @click="toSave">保存</r-button>
	      	<r-button @click="classifyDialogVisible = false">取 消</r-button>
	      	
	      </span>
	    </el-dialog>
	    
    </div>

</template>
<script>
    import utils from '../../libs/utils.js';
    import constants from '../../libs/constants.js';
    import {
        formatDate,
        parseDate
    } from '../../components/date-picker/util/index';
    export default {
        data() {
            return {
            	goodsName: '', // 商品名称
                tableData: [{
                  id:'1',
		          tag_price: '1200',
		          name: '王小虎',
		          skus:[{id:'sku的id',price:'规格价格',stock:'0',sku_str:'规格名称',sku_pic:'规格封面图'}]
		        }, {
		          id:'2',
		          tag_price: '2016-05-02',
		          name: '王小虎',
		          skus:[{id:'sku的id',price:'规格价格',stock:'1000',sku_str:'规格名称',sku_pic:'规格封面图'}]
		        }, {
		          tag_price: '2016-05-04',
		          name: '王小虎',
		          skus:[{id:'sku的id',price:'规格价格',stock:'1000',sku_str:'规格名称',sku_pic:'规格封面图'}]
		        }, {
		          tag_price: '2016-05-01',
		          name: '王小虎',
		          skus:[{id:'sku的id',price:'规格价格',stock:'0',sku_str:'规格名称',sku_pic:'规格封面图'}]
		        }],
		        multipleSelection: [],
		        // 分页
                params: {
                    "pageSize": constants.pagination.pageSize,
                    "pageNumber": 1,
                },
                total: 15,
                delDialogVisible:false,  // 删除
                oneDelete:false,
                classifyDialogVisible:false, // 分类
                DelbtnDisabled:true,
                //删除参数
		        delParam: {
		            product_id: '',
		            index: ''
		        },
		        delArr:[],
		        ruleForm: {
			        region: ''
			    },
			    //错误提示
          		msgError1: "",
			    classifyArr:[{
		            name: '手机',
		            id:'1'
		        }, ],
		        addClassList:[]
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                let that = this;
                that.getList();
            })
        },
        methods: {
        	toUpdate(){         // 刷新
        		location.reload();
        	},
        	toSearch(){  		// 搜索
        		let that = this;
        		that.getList();
        	},
        	getList(msg){
        		let that = this;
        		utils.ajax({   // 商品列表查询接口
                    url: "/seller/product/query",
                    data: {
                        "page_size": that.params.pageSize, 
                        "page_no": that.params.pageNumber, 
                        "name":that.goodsName
                    },
                    success: function (res) {
                        if (res.result) {
                            that.tableData = res.result.list;
                            that.total = parseInt(res.result.total_amount);
                            if(msg){
                            	that.$message({
	                                message: msg,
	                                type: 'success'
	                            });
                            }
                        }

                    }
                });
        	},
        	del(id,index){
        		// 单个删除
        		this.delDialogVisible = true;
		        this.delParam.product_id = id;
		        this.delParam.index = index;
		        this.oneDelete = true;
		        console.log( this.delParam)
        	},
        	toDeleteList(){ 
        		// 批量删除
        		let that = this;
        		that.delDialogVisible = true;
        		console.log('this.multipleSelectionSSS',this.multipleSelection);
        		that.delArr = [];
        		that.multipleSelection.forEach(function(item) {
		            that.delArr.push({
		            	"product_id":item.id
		            })
		            
		        })
        		console.log('that.delArrSSS',that.delArr);
        	},
            toDel(){
            	// 确定删除
            	let that = this;
            	console.log('删除的数据',that.delArr);
            	if(that.oneDelete){
            		that.delArr = [];
            		that.delArr.push({
	            		"product_id":that.delParam.product_id
	            	});
	            	console.log('单个删除',that.delArr)
            	};
            	utils.ajax({
                    url: "/seller/product/delete",
                    data: that.delArr,
                    success: function (res) {
                        if (res.success) {
                            if(that.delArr.length){   // 批量删除
                            	that.getList('删除成功');
                            }else{
                            	that.tableData.splice(that.delParam.index, 1);
	                            that.total--;
								that.delDialogVisible = false;
								that.oneDelete = false;   // 单个删除的开关
                            }
                        } else {
                            that.$notify.error({
                                title: '错误',
                                message: res.msg
                            });
                        }

                    }
                });
            },
            edit(id,index){
            	// 跳到商品编辑页面
            	utils.go("goodsEdit?id=" + id, this.$router);
            },
            toAddClassify(){   
            	//添加到分类
            	let that = this;
        		that.classifyDialogVisible = true;
        		console.log('this.multipleSelectionSSS',this.multipleSelection);
        		utils.ajax({
                    url: "/seller/product/category/list",
                    data: {},
                    success: function (res) {
                        if (res.success) {
                            that.classifyArr = res.list;
                        } else {
                            that.$notify.error({
                                title: '错误',
                                message: res.msg
                            });
                        }

                    }
                });
				that.addClassList = [];
        		that.multipleSelection.forEach(function(item) {
		            that.addClassList.push({
		            	"product_id":item.id,
		            	"name":item.name,
		            	"pics":item.pics,
		            	"product_detail":item.product_detail,
		            	"product_desc":item.product_desc,
		            	"logistics_fee":item.logistics_fee,
		            	"categ_outer_id":that.ruleForm.region.id,
		            	"categ_outer_name":that.ruleForm.region.name,
		            	"second_title":item.second_title,
		            	"tag_price":item.tag_price,
		            })
		        })
        		console.log('that.addClassList',that.addClassList);
            },
            toSave(){  
            	// 添加分类并保存
            	let that = this;
            	that.$refs.ruleForm.validate((valid) => {
			        if (valid) {
			          	alert('submit!');
			          	console.log('that.ruleForm.region',that.ruleForm.region.id)
			          	if(!that.ruleForm.region.id){
			          		console.log(111)
			              	that.msgError1 = "不能为空";
			              	setTimeout(function () {
				                that.msgError1 = "";
				              }, 1500)
				              return;
			              }else{
			              	utils.ajax({
			                    url: "/seller/product/update_category",  // 添加商品到分类
			                    data: that.addClassList,   // 分类名,
			                    success: function (res) {
			                        if (res.success) {
			                        	that.classifyDialogVisible = false;
			                        	that.$message({
			                                message: '保存成功',
			                                type: 'success'
			                            });
			                        } else {
			                            that.$notify.error({
			                                title: '错误',
			                                message: res.msg
			                            });
			                        }
			
			                    }
			                });
			              	
			              	
			              }
			        } else {
			          console.log('error submit!!');
			          return false;
			        }
			    });
            },
        	handleSelectionChange(val) {
        		this.DelbtnDisabled = false;
		        this.multipleSelection = val;
		        console.log('val',val);
		        console.log('this.multipleSelection',this.multipleSelection);
		    },
		    // 分页
            handleCurrentChange(val) {
                this.params.pageNumber = val;
                this.getList();
            },
            handleSizeChange(val) {
		        console.log(`每页 ${val} 条`);
                this.params.pageSize = val;
                this.getList();
		    },
		    addProduct(){
		    	// 添加商品
		    	utils.go("?id=" + id, this.$router);
		    },
		    handleReset() {
		      this.$refs.ruleForm.resetFields();
		    },
		    toCloseD(){
		    	this.handleReset();
		    	this.multipleSelection = [];
		    }
        },
        computed: {
            
        },
        components: {
            "rButton": require('../../components/button/button.vue'),
            "rTable": require('../../components/table/table.vue'),
            "rTableColumn": require('../../components/table/table-column.vue'),
            "elPagination": require('../../components/pagination/pagination.vue'),
            "elDialog": require('../../components/dialog/dialog.vue'),
            // 表单
	        "rForm": require('../../components/form/form.vue'),
	        "rFormItem": require('../../components/form/form-item.vue'),
	        "rInput": require('../../components/input/input.vue'),
	        "rSelect": require('../../components/select/select.vue'),
	        "rOption": require('../../components/option/option.vue'),

        }
    }
</script>
<style lang="less" scoped>
</style>