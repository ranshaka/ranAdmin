<!--
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
-->
<template>
    <div class=" minHeight100">
        <el-row :gutter="20" class="height100">
            <el-col :span="12">
                <div class="padding-2x bg-white height100 border-box">
                    <el-tabs type="border-card" class="demo-tabs height100">
                        <el-tab-pane label="Symbol">
                            <div class="article markdown">
                                <h2 id="symbol-css">Symbol 引用</h2>
                                <hr>

                                <p>这是一种全新的使用方式，应该说这才是未来的主流，也是平台目前推荐的用法。相关介绍可以参考这篇<a href="">文章</a>
                                    这种用法其实是做了一个 SVG 的集合，与另外两种相比具有如下特点：</p>
                                <ul>
                                    <li>支持多色图标了，不再受单色限制。</li>
                                    <li>通过一些技巧，支持像字体那样，通过 <code>font-size</code>, <code>color</code> 来调整样式。</li>
                                    <li>兼容性较差，支持 IE9+，及现代浏览器。</li>
                                    <li>浏览器渲染 SVG 的性能一般，还不如 png。</li>
                                </ul>
                                <p>使用步骤如下：</p>
                                <h3 id="-symbol-">第一步：引入项目下面生成的 symbol 代码：</h3>
                                <pre><code class="language-html">&lt;script src="./iconfont.js"&gt;&lt;/script&gt;
</code></pre>
                                <h3 id="-css-">第二步：加入通用 CSS 代码（引入一次就行）：</h3>
                                <pre><code class="language-html">&lt;style&gt;
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
&lt;/style&gt;
</code></pre>
                                <h3 id="-">第三步：挑选相应图标并获取类名，应用于页面：</h3>
                                <pre><code class="language-html">&lt;svg class="icon" aria-hidden="true"&gt;
  &lt;use xlink:href="#icon-xxx"&gt;&lt;/use&gt;
&lt;/svg&gt;
</code></pre>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="Unicode">
                            <div class="article markdown">
          <h2 id="unicode-">Unicode 引用</h2>
          <hr>

          <p>Unicode 是字体在网页端最原始的应用方式，特点是：</p>
          <ul>
            <li>支持按字体的方式去动态调整图标大小，颜色等等。</li>
            <li>默认情况下不支持多色，直接添加多色图标会自动去色。</li>
          </ul>
          <blockquote>
            <p>注意：新版 iconfont 支持两种方式引用多色图标：SVG symbol 引用方式和彩色字体图标模式。（使用彩色字体图标需要在「编辑项目」中开启「彩色」选项后并重新生成。）</p>
          </blockquote>
          <p>Unicode 使用步骤如下：</p>
          <h3 id="-font-face">第一步：拷贝项目下面生成的 <code>@font-face</code></h3>
          <pre><code class="language-css"
>@font-face {
  font-family: 'iconfont';
  src: url('iconfont.ttf?t=1668585551304') format('truetype');
}
</code></pre>
          <h3 id="-iconfont-">第二步：定义使用 iconfont 的样式</h3>
          <pre><code class="language-css"
>.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</code></pre>
          <h3 id="-">第三步：挑选相应图标并获取字体编码，应用于页面</h3>
          <pre>
<code class="language-html"
>&lt;span class="iconfont"&gt;&amp;#x33;&lt;/span&gt;
</code></pre>
          <blockquote>
            <p>"iconfont" 是你项目下的 font-family。可以通过编辑项目查看，默认是 "iconfont"。</p>
          </blockquote>
        </div>
                        </el-tab-pane>
                        <el-tab-pane label="font-class">
                            <div class="article markdown">
          <h2 id="font-class-">font-class 引用</h2>
          <hr>

          <p>font-class 是 Unicode 使用方式的一种变种，主要是解决 Unicode 书写不直观，语意不明确的问题。</p>
          <p>与 Unicode 使用方式相比，具有如下特点：</p>
          <ul>
            <li>相比于 Unicode 语意明确，书写更直观。可以很容易分辨这个 icon 是什么。</li>
            <li>因为使用 class 来定义图标，所以当要替换图标时，只需要修改 class 里面的 Unicode 引用。</li>
          </ul>
          <p>使用步骤如下：</p>
          <h3 id="-fontclass-">第一步：引入项目下面生成的 fontclass 代码：</h3>
          <pre><code class="language-html">&lt;link rel="stylesheet" href="./iconfont.css"&gt;
</code></pre>
          <h3 id="-">第二步：挑选相应图标并获取类名，应用于页面：</h3>
          <pre><code class="language-html">&lt;span class="iconfont icon-xxx"&gt;&lt;/span&gt;
</code></pre>
          <blockquote>
            <p>"
              iconfont" 是你项目下的 font-family。可以通过编辑项目查看，默认是 "iconfont"。</p>
          </blockquote>
        </div>



                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="padding-2x bg-white">
                    <div class="flex space-between flex-wrap">
                        <div class="iconBox" v-for="item in list" :key="item.icon_id" v-copy="'#icon-'+item.font_class">
                            <svg class="icon-4x" aria-hidden="true">
                                <use :xlink:href="'#icon-'+item.font_class"></use>
                            </svg>
                            <p>{{item.name}}</p>
                            <p>#icon-{{item.font_class}}</p>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {
        defineComponent,
        ref,
        nextTick
    } from 'vue'
    
    import iconJson from "@/assets/iconfont/iconfont.json"
    export default defineComponent({
        setup() {
            const View = `<svg class="icon-4x" aria-hidden="true">
                            <use :xlink:href="'#icon-'+item.font_class"></use>
                        </svg>`
            const list = iconJson.glyphs
            return {
                list,
                View,
            }
        }
    })
</script>
<style lang="less" scoped>
    .iconBox {
        width: 200px;
        height: 120px;
        padding: 15px;
        border-radius: 2px;
        background: #FFf;
        text-align: center;
        border: 1px solid #ccc;
        margin-bottom: 15px;
    }

    .iconBox:hover {
        box-shadow: var(--el-box-shadow)
    }


 

</style>