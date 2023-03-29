<template>
  <div>
    <div>
<!--      新增表单弹窗-->
      <el-dialog
          title="收货物料表"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose">
        <el-form ref="form"
                 :model="form"
                 :rules="rules"
                 label-width="80px">
          <el-form-item label="物料类型" prop="skuId">
            <el-select v-model="form.skuId" placeholder="请选择物料类型">
              <el-option v-for="item in skuList" :key="item.skuId"
                         :label="item.skuName"
                         :value="item.skuId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="总数量" prop="total">
            <el-input v-model.number="form.total" autocomplete="off">
            </el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="onSubmit">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div>
<!--      新增按钮-->
      <el-button type="primary"
                 @click='handleAdd'
                 size="medium"
                 icon="el-icon-plus">
        新增
      </el-button>
<!--       编辑选择按钮-->
      <el-button @click='onSelect'
                 size="medium"
                 icon="el-icon-edit-outline">
      </el-button>
<!--      删除按钮-->
      <el-button v-if="isSelect"
                 type="danger"
                 @click='handleDelete'
                 size="medium"
                 icon="el-icon-close">
        删除
      </el-button>
    </div>
    <div>
      <el-table
          :data="receiptStockPageData.records"
          stripe
          border
          highlight-current-row
          @current-change="clickRow"
          max-height="250"
          @selection-change="handleSelectionChange"
          style="width: 100%">
        <el-table-column v-if="isSelect"
                         type="selection"
                         width="55">
        </el-table-column>
        <el-table-column
            prop="receiptStockNoteId"
            label="收货物料单ID"
            width="200">
        </el-table-column>
        <el-table-column
            prop="skuId"
            label="SKUID"
            :formatter="formatSKU"
            width="200">
        </el-table-column>
        <el-table-column
            prop="total"
            label="总数量"
            width="200">
        </el-table-column>
        <el-table-column
            prop="upNum"
            label="上架数量"
            width="200">
        </el-table-column>
      </el-table>
    </div>
    <div>
<!--      分页组件-->
      <el-pagination
          background
          @current-change="getPage"
          layout="prev, pager, next, jumper"
          :total="receiptStockPageData.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ReceiptStockNote",
  data(){
    return {
      receiptStockPageData: this.$store.state.receipt.receiptStockPageData,
      form:{
        receiptStockId: '',
        receiptId: '',
        skuId: '',
        total: '',
        upNum: 0,
      },
      rules: {
        skuId:[
          { required: true, message: '请选择物料类型', trigger: 'change' }
        ],
        total:[
          { required: true, message: '数量不能为空'},
          { type: 'number', message: '数量必须为数字值'}
        ]
      },
      selectData: [],
      isSelect: false,
      dialogVisible: false,
      skuList:[],
    }
  },
  methods:{
    // 表格行格式化为SKU名
    formatSKU(row){
      let sku = this.skuList.find(
          (item)=>{
            return item.skuId === row.skuId;
          }
      );
      return sku.skuName;
    },
    // 跳转到新增用户页面
    handleAdd(){
      this.dialogVisible = true;
    },
    // 列表项删除
    handleDelete(){
      this.$store.commit("deleteStock", this.selectData);
      this.onSelect();
    },
    // 选择框事件: 返回选中的的项列表
    handleSelectionChange(val){
      this.selectData = val;
    },
    handleClose(){
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    onSubmit(){
      this.$refs.form.validate((valid) => {
        // valid校验成功返回true, 否则为false
        if (valid) {
          this.$store.commit('addStock', JSON.parse(JSON.stringify(this.form)));
        }
      })
      this.handleClose();
    },
    onSelect(){
      this.isSelect = !this.isSelect;
    },
    // 点击行事件
    clickRow(thisRow){
      // 进入查看行的页
      console.log(thisRow);
      // 弹出form框
    },
    // 分页获取
    getPage(current=1, receiptNoteId=this.receiptNoteId) {
      axios.get(`/receipt_stock_notes/${receiptNoteId}/${current}`).then(
          response => {
            // 分页查询数据
            this.receiptStockNotePageData = response.data.data;
          },
          error => {
            console.log(error);
          }
      )
    },
    getAllSKU(){
      axios.get("/skus").then(
          (response)=>{
            this.skuList = response.data.data;
          },
          (error)=>{
            console.log(error)
          }
      )
    },
  },
  mounted() {
    this.getAllSKU();
  },
  props: ['receiptNoteId']
}
</script>

<style scoped>

</style>
