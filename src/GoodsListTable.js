import React, { useState } from "react";
import { Table, Avatar } from "antd";
import { fetchGoodsList } from "./services";
import { useService } from "./hooks";

const columns = [
  {
    title: "商品名称",
    key: "name",
    dataIndex: "name",
    render: (name, row) => (
      <React.Fragment>
        <Avatar src={row.img} />
        &nbsp;&nbsp;&nbsp;&nbsp;
        {name}
      </React.Fragment>
    ),
  },
  {
    title: "商品价格",
    key: "price",
    dataIndex: "price",
    render: (price) => `￥${parseFloat(price).toFixed(2)}`,
  },
  {
    title: "商品库存",
    key: "stock",
    dataIndex: "stock",
  },
  {
    title: "创建时间",
    key: "createTime",
    dataIndex: "createTime",
  },
  {
    title: "更新时间",
    key: "updateTime",
    dataIndex: "updateTime",
  },
];

const GoodsListTable = () => {
  const [pageSize, setPageSize] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const { loading = false, error, response = {} } = useService(fetchGoodsList, {
    pageSize,
    pageNo,
  });

  const { list = [], total } = response || {};
  return (
    <div>
      <Table
        loading={loading}
        dataSource={list}
        columns={columns}
        bordered
        pagination={{
          pageSize,
          current: pageNo,
          total,
          onChange: (pageNo, pageSize) => {
            setPageNo(pageNo);
            setPageSize(pageSize);
          },
        }}
      />
    </div>
  );
};

export default GoodsListTable;
