import React from "react";
import styled from "../../style/labelNInput.module.scss";

export default function LabelNInput(props: any) {
    const { key, label, inputId, inputValue, inputType, inputPlacehoder, register, rule, errors, click } = props;
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
                {inputId === "userEmail" && (
                    <button type="button" onClick={click}>
                        중복 확인
                    </button>
                )}
                {inputId === "userTel" && (
                    <button type="button" onClick={click}>
                        인증번호 전송
                    </button>
                )}
                {inputId === "userAuthNumber" && (
                    <button type="button" onClick={click}>
                        인증번호 확인
                    </button>
                )}
            </div>
            {errors[inputId]?.message ? (
                <span style={{ color: "red", fontSize: "12px" }}>{errors[inputId]?.message}</span>
            ) : (
                <span style={{ height: "15px" }}></span>
            )}
        </>
    );
}
