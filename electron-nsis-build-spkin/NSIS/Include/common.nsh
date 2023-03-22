/***************************************************************************
* Copyright (C) 2014 Jeffery Jiang. <china_jeffery@163.com>
*
* You may opt to use, copy, modify, merge, publish, distribute and/or sell
* copies of the Software, and permit persons to whom the Software is
* furnished to do so.
*
* HOWEVER YOU CAN NOT REMOVE/MODIFY THESE COMMENTS.
*
* This software is distributed on an "AS IS" basis, WITHOUT WARRANTY OF ANY
* KIND, either express or implied.
 ***************************************************************************/
 
# ============================
# �Զ��庯�����ߺ�
# ============================

!include "nsProcess.nsh"
!include "LogicLib.nsh"
!include "FileFunc.nsh"
!insertmacro GetParameters
!insertmacro GetOptions
!macro Trace msg
    MessageBox MB_ICONINFORMATION|MB_OK "${msg}" /SD IDOK
!macroend



!define MAX_RETRY 10
Var RetryTimes

# ��ֹ����
Function TerminateProcess
    # ʹ��RtlAdjustPrivilege���������������̵�ϵͳȨ��
    System::Call ntdll::RtlAdjustPrivilege(i20,i1,i0,*i)
    StrCpy $RetryTimes 0
loop__:
    nsProcess::_FindProcess /NOUNLOAD "$R0"
	Pop $R1
    StrCmp $R1 "0" +1 TerminateProcessOver
    nsProcess::_KillProcess /NOUNLOAD "$R0"
    Pop $R1
    
    IntOp $RetryTimes $RetryTimes + 1
    ${If} $RetryTimes > ${MAX_RETRY}
        Goto TerminateProcessOver
    ${EndIf}
    
    Sleep 200
Goto loop__
TerminateProcessOver:
FunctionEnd

Function un.TerminateProcess4Uninstall
    # ʹ��RtlAdjustPrivilege���������������̵�ϵͳȨ��
    System::Call ntdll::RtlAdjustPrivilege(i20,i1,i0,*i)
    StrCpy $RetryTimes 0
loop__:
    nsProcess::_FindProcess /NOUNLOAD "$R0"
	Pop $R1
    StrCmp $R1 "0" +1 TerminateProcessOver
    nsProcess::_KillProcess /NOUNLOAD "$R0"
    Pop $R1
    
    IntOp $RetryTimes $RetryTimes + 1
    ${If} $RetryTimes > ${MAX_RETRY}
        Goto TerminateProcessOver
    ${EndIf}
    
    Sleep 200
Goto loop__
TerminateProcessOver:
FunctionEnd



# �����Զ�����ʱĿ¼,ʹ�ò��chngvrbl.dll��
# �ú������.onInit�е��á�
!macro ChangeTempDir dirPath
    StrCmp "${dirPath}" "" ChangeTempDirOver +1
    CreateDirectory "${dirPath}"
    File /oname=${dirPath}\chngvrbl.dll "chngvrbl.dll"
    Push "${dirPath}"
    Push 25 ;$TEMP
    CallInstDLL "${dirPath}\chngvrbl.dll" changeVariable
    Delete "${dirPath}\chngvrbl.dll"
ChangeTempDirOver:
!macroend

!macro DeleteTempDir
    RMDir /r "$TEMP"
!macroend

# ������������
# foo.exe /S /USERNAME Bar /D C:\Program Files\Foo
!macro ParseParameters paramName paramValue
	${GetParameters} $R0
	${GetOptions} $R0 "${paramName}" ${paramValue}
!macroend

# ȷ��VALUE��END_WITH����
!macro EnsureEndsWith VALUE END_WITH
  StrLen $R7 "${END_WITH}"
  IntOp $R8 0 - $R7
  StrCpy $R9 "${VALUE}" $R7 $R8
  StrCmp $R9 ${END_WITH} +2
  StrCpy ${VALUE} "${VALUE}${END_WITH}"
!macroend

# ���尲װ
!macro InstallFont fontFilePath fontFilename fontShowName
    IfFileExists "$FONTS\${fontFilename}" InstallFontOver
    
    System::Call "ntdll::RtlAdjustPrivilege(i20,i1,i0,*i) i.s"
    Pop $R9
    #${If} $R9 <> 0
        # ����Ȩ��ʧ��
        #MessageBox MB_ICONINFORMATION|MB_OK "����Ȩ��ʧ��!" /SD IDOK
    #${EndIf}

    File /oname=$FONTS\${fontFilename} ${fontFilePath}
    WriteRegStr HKLM "SOFTWARE\Microsoft\Windows NT\CurrentVersion\Fonts" "${fontShowName}" "$FONTS\${fontFilename}"
    System::Call "GDI32::AddFontResource(t'$FONTS\${fontFilename}') i.s"
    Pop $R9
    ${If} $R9 == 0
        MessageBox MB_ICONINFORMATION|MB_OK "��װ����ʧ��!" /SD IDOK
    ${EndIf}
!macroend




# ��ȡ�ؼ�λ��
!macro GetWindowPos parentHwnd ctrlHwnd l t r b
    
    System::Call "*(i0,i0,i0,i0) i.r11"
    System::Call "User32::GetWindowRect(i${ctrlHwnd}, i$R1)"
    System::Call "*$R1(i.r16,i.r17,i.r18,i.r19)"
    
    System::Call "*(i$R6,i$R7) i.r12)" # ����
    System::Call "*(i$R8,i$R9) i.r13)" # ����
    
    System::Call "User32::ScreenToClient(i${parentHwnd}, i$R2)"
    System::Call "User32::ScreenToClient(i${parentHwnd}, i$R3)"
    
    System::Call "*$R2(i.r14,i.r15)"
    System::Call "*$R3(i.r16,i.r17)"
    
    IntOp ${l} $R4 + 0
    IntOp ${t} $R5 + 0
    IntOp ${r} $R6 + 0
    IntOp ${b} $R7 + 0
    
    System::Free $R1
    System::Free $R2
    System::Free $R3
!macroend



# �ؼ�����͸����
!macro SetTransparent HWND IDC fontClr
  GetDlgItem $R0 ${HWND} ${IDC}
  SetCtlColors $R0 ${fontClr} transparent
!macroend
