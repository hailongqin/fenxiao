<template>
<view class="container">
    <car :hidden="true"></car>
</view>
</template>

<script>
import car from "../../components/car/car"	
export default {
	config: {
        navigationBarTitleText: '购物车'
    },
    components:{
    	car:car
    },

}
</script>

<style scoped>

</style>