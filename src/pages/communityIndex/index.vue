<template>
    <view>
        <posted></posted>
        <community></community>
        <nav1  :hidden="false"></nav1>
    </view>
</template>
<script> 
	import nav from "../../components/nav/nav"	
import posted from "../../components/posted/posted"		
import community from "../../components/community/community"	

export default {
    config: {
        navigationBarTitleText: '社区'
    },
    components:{
    	nav1:nav,
        posted:posted,
    	community:community
    },
    data () {
      return {
      }
    },
    onLoad () {

    },
}
</script>
