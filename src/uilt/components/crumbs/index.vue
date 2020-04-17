<template>
	<div class="crumbs">
		<header class="main-header">
      <ul>
        <li>
          <i></i>
          <span>首页</span>
        </li>
        <li>
          <i></i>
					<slot name="title"></slot>
        </li>
      </ul>
    </header>
	</div>
</template>

<script>
export default {

}
</script>

<style socped>
.main-header {
	font-size: 16px;
	color: #1b73b0;
}
</style>