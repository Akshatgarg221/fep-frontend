import { useState } from 'react';
import '../../css/tailwind.css';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useForm } from "react-hook-form";
import studentResetRequest, { ResetStudentParams} from "../../../callbacks/auth/student/reset";
import otpRequest, { OTPParams } from "../../../callbacks/auth/student/otp";
export default function Home(){
    const [isOTP,otpstage]=useState(true);
    const [laodingotp,setloadingotp]=useState(false);
    const [user,setUser]=useState("");
    const [password,setPassword]=useState("");
    const [otp,setOTP]=useState("");
    const [message,setMessage]=useState("");
    const [sevstatus,setsevstatus]=useState("success");
    const [OpenedSnack,SetOpen]=useState(false);
    const [loadingsignup,SetLoader]=useState(false);
    const {
      register:registerUser,
      handleSubmit:handleSubmitUser,
      formState: { errors }
    } = useForm<ResetStudentParams>();
    const {
      register: registerOTP,
      handleSubmit: handleSubmitOTP,
      getValues:gettervalues,
      formState: { errors: errorsOTP },
    } = useForm<OTPParams>();
    const sendUser = async (data: ResetStudentParams) => {
      data.user_id=user;
      data.new_password=password;
      data.otp=otp;
      setloadingotp(true);
      const response = await studentResetRequest.post(data);
      setsevstatus(response.request.status==200?"success":"error")
      setMessage(response.request.status==200?response.data.status:"Wrong credentials");
      SetOpen(true);
      setloadingotp(false);
      if(response.request.status==200){
        window.location.href="/auth/login";
      }
    };
    const sendOTP = async (data: OTPParams) => {
      data.user_id=user;
      SetLoader(true);
      const response = await otpRequest.post(data);
      setsevstatus(response.request.status==200?"success":"error")
      setMessage(response.request.status==200?response.data.status:response.message);
      otpstage(response.request.status!=200);
      SetOpen(true);
      SetLoader(false);
    };
    return (
        <> 
            <div style={{backgroundColor:'rgb(249, 250, 251)'}} className="w-full p-2">
               <div className="w-full">
                <center><img className='h-auto max-w-full' src="../images/logo.png" /></center>
                </div>
                <div className="w-full m-2">
                <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-center font-sans w-full">Reset Password</h1>
                </div>
                <center>
                <div className="md:w-full lg:w-6/12">
                <div>
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg">
  {isOTP?<>
    <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        UserName
      </label>
      <input id="user_id" {...registerOTP("user_id", {
              required: true,
              pattern: /^[^@]+@iitk\.ac\.in$/,
              setValueAs: (value) => value.trim().toLowerCase(),
            })} onChange={(event)=>{setUser(event.currentTarget.value)}} disabled={!isOTP} className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="mahirj23@iitk.ac.in" />
     {errorsOTP.user_id?<span className="text-red-600 text-xs italic">Invalid IITK Email ID</span>:<></>}
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
        Password
      </label>
      <input {...registerOTP("password", { required: true })} id="password" onChange={(event)=>{setPassword(event.currentTarget.value)}} disabled={!isOTP} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="password" placeholder="******************" />
      {errorsOTP.password && (
          <p className="text-red-600 text-xs italic">Incorrect Password</p>
        )} 
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
        New Password
      </label>
      <input {...registerOTP("confirm_password", {
            required: true,
            validate: {
              sameAsPassword: (value) => value === gettervalues("password"),
            },
          })} id="confirm-password" onChange={(event)=>{setPassword(event.currentTarget.value)}} disabled={!isOTP} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="password" placeholder="******************" />
    {errorsOTP.confirm_password && (
           <p className="text-red-600 text-xs italic">Passwords do not match</p>
        )}
    </div>
  </div>
  </>:<>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
        UserOTP
      </label>
      <input id="user_otp" {...registerUser("otp",{required:true})} disabled={isOTP} onChange={(event)=>{setOTP(event.currentTarget.value)}} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" value={otp} placeholder="123456" />
      {errors.otp && (
           <p className="text-red-600 text-xs italic">Enter OTP</p>
        )}
    </div>
  </div>
  </>}
  <div className="flex items-center justify-between mt-6">
      {isOTP?<>
      <LoadingButton loading={loadingsignup} onClick={handleSubmitOTP(sendOTP)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
       Reset Password
      </LoadingButton>
      </>:<>
      <LoadingButton loading={laodingotp} onClick={handleSubmitUser(sendUser)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
         Confirm
      </LoadingButton>
       <LoadingButton loading={false} onClick={()=>{otpstage(true);SetLoader(false);setloadingotp(false);}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
       Change User Id
       </LoadingButton>
      </>}
      <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/auth/login">
        Sign In
      </a>
    </div>
</form>
</div>
                </div>
                </center>
            </div>
    <Snackbar
        open={OpenedSnack}
        autoHideDuration={3000}
        onClose={()=>{SetOpen(false)}}
      >
        <Alert
    onClose={()=>{SetOpen(false)}}
    severity={sevstatus}
    variant="filled"
    sx={{ width: '100%' }}
  >
   {message}
  </Alert>
      </Snackbar>
        </>
    )
}