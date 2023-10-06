import styled from "styled-components";

// 전체 layout
export const Container = styled.div`
    display: flex;
    flex-direction: column;

    width: 792px;
    margin: 0 auto;
    margin-top: 64px;
`;

export const Title = styled.header`
    margin-bottom: 40px;

    color: #212224;
    font-family: 'Pretendard';
    font-size: 40px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%;
`;

export const Caption = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    margin-bottom: 24px;
`

export const Label = styled.div`
    color: #212224;

    font-family: 'Pretendard';
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%;
`;

export const ImgRegisterBtn = styled.button`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 139px;
    height: 40px;

    padding: 8px 20px;
    background-color: transparent;
    border: 1px solid #DCDFE3;
    border-radius: 6px;

    color: #4D5359;
    text-align: center;
    font-family: 'Pretendard';
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%;

    &:hover {
        cursor: pointer;
    }
`;

export const ImgRegisterGuide = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    width: 100%;
    height: 76px;
    margin-bottom: 8px;
    padding-left: 16px;

    border-radius: 8px;
    background: #FFF2E8;
    box-sizing: border-box;
    list-style-type: none;
`;

export const Li = styled.li`
    color: #4D5359;
    font-family: 'Pretendard';
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; 

    &:before {
        content: '-';
        margin-right: 6px;
    }
`;

export const Accent = styled.span`
    color: #FF7710;

    font-family: 'Pretendard';
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%;
`;

export const ImageMent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    min-height: 120px;

    border-radius: 8px;
    background: #F2F4F6;

    color: #ADB3BA;
    text-align: center;

    font-family: 'Pretendard';
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%;

`;

export const Images = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    box-sizing: border-box;

    width: 100%;
    min-height: 120px;
    padding: 16px;

    border-radius: 8px;
    background: #F2F4F6;

    color: #ADB3BA;
    text-align: center;

    font-family: 'Pretendard';
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%;
`;

export const Img = styled.div<{ src: string }>`
    position: relative;
    width: 248px;
    height: 140px;
    background-image: url(${props => props.src});
    background-size: cover;
`;

export const DeleteBtn = styled.button<{ isFirst: boolean }>`
    display: flex;
    justify-content: space-around;
    align-items: center;

    position: absolute;
    top: 9px;
    left: 9px;

    width: 72px;
    height: 30px;
    padding: 6px;
    flex-shrink: 0;

    border-radius: 4.516px;
    border: none;
    background: ${props => props.isFirst ? 'var(--Orange-600, #FF7710)' : 'var(--Grey-900, #212224)'};

    &:hover {
        cursor: pointer;
    }
`;

export const ImgNumber = styled.div`
    width: 20px;
    color: var(--White, #FFF);
    text-align: center;

    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
`;

export const Form = styled.form`
    width: 100%;
    margin-bottom: 100px;
`;

export const Field = styled.div`
    margin-bottom: 40px;

    &:first-child {
        margin-top: 40px;
    }

    &:last-child {
        margin-bottom: 0;
    }

    div {
        margin-bottom: 8px;
    }
`;

export const FlexField = styled.div`
    display: flex;
    justify-content: flex-start;
`
export const Gap = styled.div`
    width: 8px;
    height: 8px;
`

export const PeriodInput = styled.input<{ value: any }>`
    position: relative;
    width: 180px;
    height: 48px;

    margin-right: 8px;
    padding: 12px 24px;
    box-sizing: border-box;

    border-radius: 6px;
    border: 1px solid var(--Grey-400, #DCDFE3);
    background: var(--White, #FFF);

    color: ${props => props.value ? 'var(--Grey-900, #212224)' : 'var(--grey-600, #adb3ba)'};
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;

    outline: 0;

    // 날짜 전체를 선택해도 date picker가 오픈될 수 있도록 처리
    &::-webkit-calendar-picker-indicator {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: transparent;
        color: transparent;
        cursor: pointer;
    }

    &::before {
        display: ${props => props.value ? 'none' : 'block'};
        content: attr(placeholder); 
        width: 100%;
        height: 100%;
    }

    &:last-child {
        margin-left: 8px;
    }

    &:hover {
        border-color: #FF7710;
    }

    &:focus {
        border-color: #FF7710;
    }

`;

export const Input = styled.input`
    width: 100%;
    height: 48px;
    padding: 12px 24px;

    border-radius: 6px;
    border: 1px solid var(--grey-400, #dcdfe3);
    background: var(--white, #fff);
    box-sizing: border-box;

    font-family: 'Pretendard';
    font-size: 16px;
    color: var(--grey-900, #212224);
    font-weight: 500;
    line-height: 150%;
    
    outline: 0;

    &::placeholder {
        color: var(--grey-600, #adb3ba);
    }
    &:focus {
        border: 1px solid var(--orange-600, #ff7710);
    }
`;

export const RegisterBtn = styled.button<{ active: boolean }>`
    width: 126px;
    height: 56px;
    padding: 13px 28px;

    border-radius: 8px;
    border: none;
    background: ${props => props.active ?  '#FF7710' : '#ADB3BA'};

    color: var(--White, #FFF);
    text-align: center;

    font-family: 'Pretendard';
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%;

    &:hover {
        ${props => props.active ? 'cursor: pointer' : 'null'};
    }
`;

export const CheckBoxDiv = styled.div`
    display: grid;
    grid-template-areas:
        'etc . . .'
        'check1 check2 check3 check4'
        'check5 check6 check7 check8'
        'check9 check10 check11 check12'
    ;
    width: 100%;

    padding: 22px 24px;

    border-radius: 6px;
    border: 1px solid var(--grey-400, #dcdfe3);
    background: var(--white, #fff);
    box-sizing: border-box;
`;

export const CheckEtc = styled.div`
    grid-area: etc;
`

export const CheckArea = styled.div<{ $id: number }>`
    grid-area: ${props => `check${props.$id}`};
`