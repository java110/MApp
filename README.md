
### 如何安装

1、安装 react native，android 及IOS 环境（请自行百度）

2、debug模式运行

```

git clone https://github.com/java110/MApp.git

cd Mapp/

react-native run-android

react-native start

```

3、打包release版本

```
git clone https://github.com/java110/MApp.git

cd Mapp/

react-native bundle --entry-file index.js --platform android --dev false --bundle-output ./android/app/src/main/assets/index.android.bundle --assets-dest ./android/app/src/main/res/

cd .\android\

.\gradlew clean

查看.\android\app\src\res\ 是否有

.\gradlew assembleRelease
```

### 系统效果图

[下载apk](output/MApp.apk)

<div style="align=center">
<img width="300" height="500" src="doc/IMG_0599.JPG"/>
</div>


<div style="align=center">
<img style="margin:10px" width="300" height="500" src="doc/IMG_0600.PNG"/>
</div>

<div style="align=center">
<img width="300" height="500" src="doc/IMG_0601.JPG"/>
</div>
<div sstyle="align=center">
<img style="margin:10px" width="300" height="500" src="doc/IMG_0602.PNG"/>
</div>

<div sstyle="align=center">
<img width="300" height="500" src="doc/IMG_0603.PNG"/>
</div>

