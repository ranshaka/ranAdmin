!define VUE_APP_NAME "ranAdmin"
!macro customInstall
  DetailPrint "Register ${VUE_APP_NAME} URI Handler"
  DeleteRegKey HKCR "${VUE_APP_NAME}"
  WriteRegStr HKCR "${VUE_APP_NAME}" "" "${VUE_APP_NAME}"
  WriteRegStr HKCR "${VUE_APP_NAME}" "URL Protocol" ""
  WriteRegStr HKCR "${VUE_APP_NAME}\shell" "" ""
  WriteRegStr HKCR "${VUE_APP_NAME}\shell\Open" "" ""
  WriteRegStr HKCR "${VUE_APP_NAME}\shell\Open\command" "" "$INSTDIR\${APP_EXECUTABLE_FILENAME} %1"

!macroend
!macro customUnInstall
  DeleteRegKey HKCR "${VUE_APP_NAME}"
!macroend