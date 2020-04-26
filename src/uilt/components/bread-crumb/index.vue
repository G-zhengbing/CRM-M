<template>
  <Card>
    <Breadcrumb>
      <BreadcrumbItem to="/main/home">首页</BreadcrumbItem>
      <BreadcrumbItem>
        <!-- 具名插槽 -->
        <slot name="title"></slot>
      </BreadcrumbItem>
    </Breadcrumb>
  </Card>
</template>
<script>
export default {};
</script>
