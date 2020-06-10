# 第九周 总结

## **CSS动画**

### Animation

  - @keyframes 关键帧
  - animation 属性
    - animation-name —— 时间曲线名
    - animation-duration —— 动画时长
    - animation-timing-function —— 动画的时间曲线
    - animation-delay —— 动画开始前的延迟
    - animation-iteration-count —— 动画播放次数；
    - animation-direction —— 动画方向
```
div{
    animation:mykf 2s ease 1s infinite alternate; 
}

@keyframes mykf {
    0%{background:red;}
    50%{background:green;}
    100%{ background:yellow;}
}
```
### Transition


  - transition-property —— 变换属性
  - transition-duration —— 变换时长
  - transition-timing-function —— 时间曲线
    - ease 
    - linear 
    - ease-in
    - ease-out
    - ease-in-out
  - transition-delay

### cubic-bezier 

贝塞尔曲线( https://cubic-bezier.com )

css中使用的是三次贝塞尔曲线。

![一次贝塞尔曲线](https://github.com/bakenray/Frontend-01-Template/blob/master/week09/images/cubic_bezier_1.png)
![二次贝塞尔曲线](https://github.com/bakenray/Frontend-01-Template/blob/master/week09/images/cubic_bezier_1.png)
![三次贝塞尔曲线](https://github.com/bakenray/Frontend-01-Template/blob/master/week09/images/cubic_bezier_1.png)





## **重学HTML** 

## **DOM API和事件**