import { useForm } from "react-hook-form";
import LabelNInput from "../../components/common/LabelNInput";
import { Form } from "react-router-dom";
import { useEffect, useState } from "react";

import "../../style/signup.scss";

interface FormValues {
    userName: string;
    userEmail: string;
    userPw: string;
    userPwCheck: string;
    userTel: string;
    userAuthNumber: string;
}
interface InputDataSetting {
    label: string;
    inputId: string;
    inputValue: string;
    inputPlacehoder: string;
    inputType: string;
    rule: {
        required: string;
        pattern?: { value: RegExp; message: string };
    };
    click?: () => void;
}
const REGEXP = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
export default function Signup() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setError,
    } = useForm<FormValues>({ mode: "onChange" });
    const watchUserEmail = watch("userEmail");
    const watchUserTel = watch("userTel");
    const watchUserAuthNumber = watch("userAuthNumber");
    const labelNInputData: InputDataSetting[] = [
        {
            label: "이름",
            inputId: "userName",
            inputValue: "",
            inputPlacehoder: "이름",
            inputType: "text",
            rule: {
                required: "이름을 입력하세요",
            },
        },
        {
            label: "이메일",
            inputId: "userEmail",
            inputValue: "",
            inputPlacehoder: "이메일",
            inputType: "email",
            rule: {
                required: "이메일을 입력하세요",
                pattern: {
                    ///^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
                    message: "이메일 형식에 맞지 않습니다.",
                },
            },
            click: function (): void {
                console.log("이메일 중복체크");
            },
        },
        {
            label: "비밀번호",
            inputId: "userPw",
            inputValue: "",
            inputPlacehoder: "비밀번호",
            inputType: "password",
            rule: {
                required: "비밀번호를 입력하세요",
            },
        },
        {
            label: `비밀번호 확인`,
            inputId: "userPwCheck",
            inputValue: "",
            inputPlacehoder: "비밀번호 확인",
            inputType: "password",
            rule: {
                required: "비밀번호를 한번더 입력하세요",
            },
        },
        {
            label: "휴대폰",
            inputId: "userTel",
            inputValue: "",
            inputPlacehoder: "휴대폰 번호",
            inputType: "tel",
            rule: {
                required: "휴대폰번호를 입력하세요",
            },
            click: function (): void {
                console.log("인증번호 전송");
            },
        },
        {
            label: "인증번호",
            inputId: "userAuthNumber",
            inputValue: "",
            inputPlacehoder: "인증번호",
            inputType: "number",
            rule: {
                required: "인증번호를 입력하세요",
            },
            click: function (): void {
                console.log("인증번호 확인");
            },
        },
    ];
    const onSubmit = (data: FormValues) => {
        const { userName, userEmail, userPw, userPwCheck, userTel, userAuthNumber } = data;
        if (userPw !== userPwCheck) {
            setError("userPwCheck", { message: "비밀번호가 일치하지 않습니다." }, { shouldFocus: true });
        }
    };
    const onInvalid = (errors: object) => {
        console.log(errors);
    };
    return (
        <main>
            <div className="singup-background">
                <div className="app-title">
                    <span className="app-title-large">개</span>
                    린이
                    <span className="app-title-large">콜</span>라보
                </div>
                <div className="signup-body">
                    <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
                        {labelNInputData.map((data, index) => {
                            return (
                                <>
                                    <LabelNInput
                                        register={register}
                                        key={index}
                                        label={data.label}
                                        inputId={data.inputId}
                                        inputPlacehoder={data.inputPlacehoder}
                                        inputType={data.inputType}
                                        rule={data.rule}
                                        errors={errors}
                                        click={data.click || undefined}
                                    />
                                </>
                            );
                        })}
                        <button type="submit">제출</button>
                    </form>
                </div>
            </div>
        </main>
    );
}
