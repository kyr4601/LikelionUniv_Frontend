import * as MG from './MainGraphic.style';
import { useState, useEffect, useRef } from 'react';
import { debounce } from 'lodash';

import maintext from '../../img/landing/main_text.png';
import mainimage from '../../img/landing/main_image.png';
import desimage from '../../img/landing/des_image.png';
import { ReactComponent as MainText } from '../../img/landing/main_text.svg';
import { ReactComponent as PixelFireworksIcon } from '../../img/landing/pixel_fireworks.svg';
import { ReactComponent as PixelSingingIcon } from '../../img/landing/pixel_singing.svg';
import { ReactComponent as PixelBlubIcon } from '../../img/landing/pixel_bulb.svg';

const MainGraphic = () => {
    const [width, setWidth] = useState<number>(window.innerWidth);
    const [isPC, setIsPC] = useState<boolean>(true);
    useEffect(() => {
        const handleResize = debounce(() => {
            setWidth(window.innerWidth);
        }, 200);
        window.addEventListener(`resize`, handleResize);
        return () => {
            window.removeEventListener(`resize`, handleResize);
        };
    }, []);
    useEffect(() => {
        if (width > 768) setIsPC(true);
        else setIsPC(false);
        console.log(isPC);
    }, [width]);

    return (
        <MG.Wrapper>
            <MG.Background>
                <div>
                    <img src={maintext} />
                </div>
                <img src={mainimage} />
            </MG.Background>
            <MG.Line>
                {[1, 2].map(item => (
                    <div
                        className={
                            item === 1
                                ? 'track track1'
                                : item === 2
                                ? 'track track2'
                                : ''
                        }
                        key={item}
                    >
                        {[1, 2, 3, 4].map(item => (
                            <div className="flex" key={item}>
                                <PixelFireworksIcon />
                                <PixelSingingIcon />
                                <div className="spacemono text">
                                    Possibility to Reality
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </MG.Line>
            <MG.Description>
                <div className="container">
                    <div className="title">국내 최대 규모 개발 창업 동아리</div>
                    <div className="title">
                        <PixelBlubIcon /> 멋쟁이사자처럼
                    </div>
                    <div className="text">
                        ‘멋쟁이사자처럼’은 전국 61개 대학의 2,000여 명의
                        학생들이 함께하는 {isPC && <br />}
                        개발/창업 동아리입니다. {!isPC && <br />}
                        IT 교육을 통해 성장의지를 가진 누구나 한 단계 더 성장할
                        수 있도록 도우며, 서비스 개발과 창업 아이디어를 현실로
                        만들기 위한 끊임없는 도전을 응원합니다.
                    </div>
                </div>
                <img className="desimage" src={desimage} />
            </MG.Description>
        </MG.Wrapper>
    );
};

export default MainGraphic;
