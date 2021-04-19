<template>
  <div class="lv-table">
    <el-table
      ref="table"
      :height="tableHeight"
      :data="dataSource"
      v-loading="listLoading"
      border
      stripe
      size="mini"
      element-loading-text=""
      @row-click="rowClick"
      @selection-change="handleSelectionChange"
      element-loading-spinner="el-icon-loading"
      :row-key="rowKey"
      :tree-props="treeProps"
      :indent="indent"
      default-expand-all
      :row-class-name="tableRowClassName"
    >
      <template slot="empty">
        <img src="../assets/table-nodata.png" alt="" />
      </template>
      <el-table-column v-if="hasSelect" align="center" type="selection" width="50"> </el-table-column>
      <el-table-column v-if="hasIndex" label="序号" type="index" align="center" width="50"> </el-table-column>
      <template v-for="column in columns">
        <template v-if="!column.hidden">
          <el-table-column
            v-if="!column.customized"
            :label="column.label"
            :fixed="column.fixed"
            :prop="column.prop"
            align="center"
            :min-width="column.minWidth"
            :sortable="column.sortable"
            :width="column.width"
            :key="column.label"
          >
            <template slot-scope="scope">
              <span
                v-if="!column.handler"
                :class="typeof column.class === 'function' ? column.class(scope.row[column.prop]) : column.class"
              >
                {{ scope.row[column.prop] || "0" }}
              </span>
              <span
                v-else
                :class="typeof column.class === 'function' ? column.class(scope.row[column.prop]) : column.class"
              >
                {{ column.handler(scope.row[column.prop] ) || "0" }}
              </span>
            </template>
          </el-table-column>
          <slot v-else :name="column.key"></slot>
        </template>
      </template>
      <slot name="operationColumn"></slot>
    </el-table>
    <slot name="bottom"></slot>
    <div v-if="hasPagination && +total > 0" class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pageNo"
        :pager-count="pagerCount"
        :page-sizes="[5, 10, 20, 50, 100]"
        :page-size="pageSize"
        layout="slot, pager, sizes"
        :total="total"
      >
        <el-button :disabled="this.pageNo <= 1" class="pagin-index" @click="goToPre">上一页</el-button>
      </el-pagination>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pageNo"
        :pager-count="pagerCount"
        :page-sizes="[5, 20, 50, 100]"
        :page-size="pageSize"
        layout="slot"
        :total="total"
      >
        <div class="page-end">
          <!--          <span class="current-page">{{pageNo}}</span>-->
          <el-button :disabled="pageNo >= totalPage" class="pagin-index" @click="goToNext">下一页</el-button>
          <span class="total"
            >共<span class="total-text">{{ totalPage }}</span
            >页</span
          >
          <span class="jump"
            >到<el-input v-model="jumpPage" class="jump-input"></el-input>页
            <el-button class="jump-sure" @click="jump">确定</el-button></span
          >
        </div>
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    // this.$nextTick(this.onResizeWindow);
    window.addEventListener("resize", this.onResizeWindow);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResizeWindow);
  },
  data() {
    return {
      pageSize: 5,
      pageNo: 1,
      pagerCount: 5,
      jumpPage: 1,

      total: 0,
      totalPage: 0
    };
  },
  props: {
    tableRowClassName: {
      type: [String, Function],
      default: ""
    },
    indent: {
      type: Number,
      default: 16
    },
    treeProps: Object,
    rowKey: String,
    tableHeight: {
      type: [Number, String]
      // default: "100%"
    },
    dataSource: {
      type: Array,
      required: true
    },
    listLoading: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      required: true
    },
    hasIndex: {
      type: Boolean,
      default: false
    },
    hasSelect: {
      type: Boolean,
      default: false
    },
    hasPagination: {
      type: Boolean,
      default: false
    },
    showSummary: {
      type: Boolean,
      default: false
    },
    pages: { type: Object, default: () => {} }
  },
  computed: {
    // totalPage() {
    //   return Math.ceil(this.total / this.pageSize);
    // },
    selectedRows() {
      return this.dataSource.filter((item) => item.selected);
    }
  },
  watch: {
    async selectedRows(rows) {
      await this.$nextTick();
      rows.forEach((row) => {
        this.$refs.table.toggleRowSelection(row, true);
      });
    },
    total(val) {
      if (this.pageSize * (this.pageNo - 1) > val) {
        console.log(val, this.pageSize * (this.pageNo - 1));
        this.pageNo = 1;
        this.$emit("paginationChanged", {
          pageNo: this.pageNo,
          pageSize: this.pageSize
        });
      }
    },
    dataSource(val) {
      if (val.length) {
        this.$nextTick(() => {
          this.$refs.table.doLayout(); // 修复行数据错落
        });
      }
    },
    pages(p) {
      this.pageNo = p.current_page;
      this.pageSize = p.page_size;
      this.totalPage = p.total_pages;
      this.total = p.total_size;
    },
    jumpPage(val) {
      if (val === "") return;
      const reg = new RegExp("^([1-9]{1,1}[0-9]{0,3})$");
      const curr = reg.exec(val);
      if (curr) {
        this.jumpPage = Math.min(curr[0], this.totalPage);
      } else {
        this.jumpPage = "";
      }
    }
  },
  methods: {
    onResizeWindow() {
      this.$emit("onResizeWindow");
    },
    rowClick(row, column, event) {
      this.$emit("rowClick", { row, column, event });
    },
    goToPre() {
      if (this.pageNo < 2) return;
      this.pageNo--;
      this.$emit("paginationChanged", {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      });
    },
    goToNext() {
      this.pageNo++;
      this.$emit("paginationChanged", {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageNo = 1;
      this.$emit("paginationChanged", {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      });
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.$emit("paginationChanged", {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      });
    },
    handleSelectionChange(val) {
      // console.log(val);
      this.dataSource.forEach((item) => {
        item.selected = val.includes(item);
      });
    },
    jump() {
      this.pageNo = +this.jumpPage || 1;
      this.$emit("paginationChanged", {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      });
      this.jumpPage = "";
    }
  }
};
</script>

<style lang="scss">
// .table-box {
//   height: 100%;
// }
</style>

<style lang="scss" scoped>
$theme-color: #e5f1fe;
.lv-table {
  // height: calc(100% - 55px);
  .pagination-container {
    display: flex;
    color: #898989;
    padding-top: 10px;
  }
  .page-end {
    .total-text {
      min-width: unset;
    }
  }
  .pagin-index {
    text-align: center;
    padding: 0 10px;
    cursor: pointer;
    color: #898989;
    border: 1px solid #eeeeee;
  }
  .current-page {
    display: inline-block;
    width: 32px;
    height: 32px;
    border-radius: 3px;
    border: 1px solid #eeeeee;
    text-align: center;
    margin-right: 10px;
    color: #666666;
  }
  .total {
    margin-left: 10px;
  }
  .jump {
    margin-left: 10px;
    .jump-input {
      width: 68px;
      margin: 0 8px;
    }
    .jump-sure {
      margin-left: 10px;
      background: #f6f8fc;
      border: 1px solid #eeeeee;
    }
  }
  .is-disabled {
    color: #c0c4cc;
    background-color: #ffffff;
    cursor: not-allowed;
  }
}
</style>
<style lang="scss">
$theme-color: #e5f1fe;
.el-table .cell {
  white-space: pre-line; /*保留换行符*/
}
.lv-table {
  .el-table thead {
    color: black;
  }
  .el-table th {
    background: $theme-color;
    font-weight: bold;
  }
  .el-pagination {
    font-weight: normal;
    padding: 0;
    color: #898989;
    .el-pager {
      li {
        border: 1px solid #eeeeee;
        min-width: 28px;
        margin-left: 6px;
        color: #898989;
        &:last-child {
          margin-right: 6px;
        }
      }
      .active {
        background: #1890ff;
        color: white;
      }
    }
  }
}
</style>
