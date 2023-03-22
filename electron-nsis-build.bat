@set directory_path=%cd%
@set electron_build_path=%cd%
@set electron_unpacked_dir=%electron_build_path%\dist_electron\win-unpacked
@set electron_Niuniu_NSIS_SetupSkin_dir=%electron_build_path%\electron-nsis-build-spkin\FilesToInstall

cd %electron_build_path%
call npm run electron:build


@echo off
xcopy /y/s/e/h %cd%\dist_electron\win-unpacked %cd%\electron-nsis-build-spkin\FilesToInstall


cd %electron_build_path%\electron-nsis-build-spkin
call build-nim-nozip.bat

cd %directory_path% 

rd electron-nsis-ui-dist
md electron-nsis-ui-dist

xcopy /y/s/e/h %cd%\electron-nsis-build-spkin\Output\ %cd%\electron-nsis-ui-dist
copy  %cd%\dist_electron\latest.yml %cd%\electron-nsis-ui-dist

rd  /s /q  %cd%\electron-nsis-build-spkin\FilesToInstall
md  %cd%\electron-nsis-build-spkin\FilesToInstall