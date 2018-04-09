<template>
      <!--pages/topics/topics.wxml-->

            <view class="page">
                <view class="top plr30 box-s ">
                    <view class="ft28 c007 container">【帖子】孙悟空到底应该长什么样?</view>
                </view>
                <view class="lookDetail_list">
                    <view class="header box-s">
                    <view class="user fl-l">
                        <view class="user_avatar fl-l">
                            <image class="user_img" src="../../img/bg.png"></image>
                        </view>
                        <view class="fl-l ft26 ml20">
                            <view class="user_name ">哈哈我是测试 <text class="user_sign ft18 white txt-c ml20">楼主</text></view>
                            <view class="posted_time">2017-07-21 12:33</view>
                        </view>
                    </view>
                    <view class="collect fl-r pos-r">
                        <text class="c9 ft24">2楼</text>
                    </view>
                </view>
                <view class="content box-s">
                    <view class="content_title c3 ft36 mb20">孙悟空到底应该长什么样？</view>
                    <view class="c3 ft28 article">《悟空传》要上院线了，彭于晏即将顶着一头红毛，跟 当年《情癫大圣》里的陈柏霖争夺“最帅孙悟空”的名号。 不过，虽然叫美猴王，但孙悟空长得这么帅合理吗？ 《悟空传》要上院线了，彭于晏即将顶着一头红毛，跟 当年《情癫大圣》里的陈柏霖争夺“最帅孙悟空”的名号。 不过，虽然叫美猴王，但孙悟空长得这么帅合理吗？里 的陈柏霖争夺“最帅孙悟空”的名号。不过，虽然叫美猴 王，但孙悟空长得这么帅合理吗？
                    </view>
                    <image class="article_imgs mt20" mode="widthFix" src="../../img/bg.png"></image>

                    <view class="recommend_content_count display-flex">
                        <view class="reply pos-r ">
                            <image class="reply_image pos-a" style="width:26rpx;height26rpx;" src="http://image.vdongchina.com/M00/03/39/ZSUkmVngEjWEdHPjAAAAAJubMhE385.png" />
                            <text class="reply_count pos-r">恢复</text>
                            <view class="test c9 pos-a">·</view>
                        </view>
                        
                        <view class="reply pos-r">
                            <image class="reply_image pos-a" style="width:26rpx;height26rpx;" src="http://image.vdongchina.com/M00/03/39/ZSUkmVngEjWEdHPjAAAAAJubMhE385.png" />
                            <text class="reply_count pos-r">彻底删除</text>
                        </view>
                    </view>
                </view>
                <view class="top_button">
                    <button @tap="top" class="comment_button_bt ft24 white pos-r"> <image class="gentie_bt_img" src="http://image.vdongchina.com/M00/03/30/ZSUkmVnfFgKELyEdAAAAAOKScPE218.png"></image>顶部</button>
                </view>
                </view>
                
            </view>


</template>
<script>
        export default {
        data (){
            return{
                
            }
        }
        }
</script>

<style scoped>
        .header,.content{
            padding: 30rpx 20rpx;
            
        }
        .header{
            overflow: hidden;
        }
        .user{
            overflow: hidden;
        }
        .user_img{
            width: 76rpx;
            height: 76rpx;
            border-radius: 50%;
        }
        .user_name,.posted_time{
            height: 37rpx;
            line-height: 37rpx;
        }
        .posted_time{
            color: #6D6D6D;
        }
        .user_sign{
            display: inline-block;
            width: 49rpx;
            height: 28rpx;
            line-height: 28rpx;
            background: #C7E2FB;
            border-radius: 4px;
            -moz-border-radius: 4rpx;
            -webkit-border-radius: 4rpx;
        }
        .collect{
            color: #3786EF;
            height: 33rpx;
            line-height: 33rpx;
            padding-bottom: 20rpx;

        }
        .append_symbol,.collect_title{
            display: inline-block;
            height: 33rpx;
            line-height: 33rpx;
        }
        .append_symbol{
            top: 4rpx;
        }
        .collect_title{
            padding-left: 30rpx;
        }
        /*文章  */
        .content{
            overflow: hidden;
        }
        .content_title{
            height: 50rpx;
            line-height: 50rpx;
        }
        .article{
            line-height: 40rpx;
        }
        .article_imgs{

        }

        .recommend_content_count {
                float: right;
                margin-top: 26rpx;
            }

    .reply {
        padding-left: 50rpx;
        height: 28rpx;
        line-height: 28rpx;
    }

    .reply_image {
        width: 26rpx;
        height: 26rpx;
        top: 8rpx;
        left: 20rpx;
    }

    .reply_count {
        font-size: 24rpx;
        color: #979797;
        height: 28rpx;
        line-height: 28rpx;
    }

    .shuxian {
        width: 2px;
        height: 20rpx;
        background: #979797;
        border-radius: 2px;
        -moz-border-radius: 2px;
        -webkit-border-radius: 2px;
        margin-top: 10rpx;
        margin-left: 14rpx;
    }


    /*文章的评论  */
    .article_comment{
        width: 100%;
        background: #FAFAFA;
        border-radius: 2px;
        -moz-border-radius: 2px;
        -webkit-border-radius: 2px;
        padding: 20rpx 30rpx;
        clear: both;
        line-height: 33rpx;
    }
    .look_more{
        height: 73rpx;
        line-height: 73rpx;
        background: #FAFAFA;
        padding: 0 30rpx;
    

    }
    .look_more_title{
        display: inline-block;
    }
    .article_comments{
        padding-bottom: 30rpx;
        border-bottom: 1px solid #D8D8D8;
    }

    /*跟帖  */
    .postContent{
        clear: both;
        padding-top: 20rpx;
    }


    /*跟帖按钮  */
    .comment_button{
        position: fixed;
        width: 130rpx;
        height: 55rpx;
        line-height: 55rpx;
        bottom: 113rpx;
        right: 0;
    }
    .comment_button_bt{
        height: 55rpx;
        line-height: 55rpx;
        background: rgba(51, 149, 255, 0.8);
        border-radius: 0;
       border-top-left-radius: 25rpx;
       border-bottom-left-radius: 25rpx;
       padding-left: 50rpx;
    }
    .gentie_bt_img{
        position: absolute;
        top: 12rpx;
        left: 15rpx;
        width: 30rpx;
        height: 30rpx;
    }
    .top_button{
         position: fixed;
        width: 130rpx;
        height: 55rpx;
        line-height: 55rpx;
        bottom: 40rpx;
        right: 0;
    }
    .top{
        position: fixed;
        width: 750rpx;
        height: 88rpx;
        line-height: 88rpx;
        background: #FAFAFA;
        box-shadow: 0 2px 4px 0 rgba(211,211,211,0.50);
         -moz-box-shadow: 0 2px 4px 0 rgba(211,211,211,0.50);
         -webkit-box-shadow: 0 2px 4px 0 rgba(211,211,211,0.50);
         overflow: hidden;
    }
   .container{
           position: relative;
        }
        .container:before{
            content: "";
            display: block;
            position: absolute;
            top: 50%;
            right: 0;
            width: 0;
            height: 0;
            border:8px solid;
            margin-top: -6px;
            border-color: transparent transparent transparent  #007AFF;
        }
        .container:after{
            content: "";
            display: block;
            position: absolute;
            top: 50%;
            right: 1px;
            width: 0;
            height: 0;
            border:8px solid;
            margin-top: -6px;
            border-color: transparent transparent transparent #FAFAFA;
        }
        .test{
            right: -14rpx;
            top: 4rpx;
        }


        .lookDetail_list{
            padding-top: 88rpx;
              box-shadow: 0 2rpx 4rpx 0 rgba(211, 211, 211, 0.50);
    -moz-box-shadow: 0 2rpx 4rpx 0 rgba(211, 211, 211, 0.50);
    -webkit-box-shadow: 0 2rpx 4rpx 0 rgba(211, 211, 211, 0.50);
        }
</style>


