import React from "react";
import styled from "../../style/labelNInput.module.scss";

export default function LabelNInput(props: any) {
    const { label, inputId, inputValue, inputType, inputPlacehoder, register, rule, errors, click } = props;
    const makeButtonFunc = (buttonValue: string, click: any): JSX.Element => {
        return (
            <button type="button" onClick={click}>
                {buttonValue}
            </button>
        );
    };
    return (
        <>
            <div className={styled.labelNInputBoxDiv}>
                <span className={styled.labelNInputBoxSpan}>
                    <label htmlFor="inputId">{label}</label>
                    <input
                        type={inputType}
                        id={inputId}
                        value={inputValue}
                        placeholder={inputPlacehoder}
                        {...register(inputId, rule)}
                    />
                </span>
                {inputId === "userEmail" && makeButtonFunc("중복확인", click)}
                {inputId === "userTel" && makeButtonFunc("인증번호 전송", click)}
                {inputId === "userAuthNumber" && makeButtonFunc("인증번호 확인", click)}
            </div>
            {errors[inputId]?.message ? (
                <span style={{ color: "red", fontSize: "12px" }}>{errors[inputId]?.message}</span>
            ) : (
                <span style={{ height: "15px" }}></span>
            )}
        </>
    );
}
