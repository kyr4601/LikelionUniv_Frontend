import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as U from './UnivcontentStyle';
import Arrow1 from '../../img/recruit/1arrow.svg';
import Arrow2 from '../../img/recruit/2arrow.svg';
import Arrow3 from '../../img/recruit/3arrow.svg';
import Arrow4 from '../../img/recruit/4arrow.svg';
import Arrow5 from '../../img/recruit/5arrow.svg';
import Arrow6 from '../../img/recruit/6arrow.svg';
import Oarrow from '../../img/recruit/Oarrow.svg';
import Email2 from '../../img/recruit/Email2.svg';
import Mail from '../../img/recruit/mail.svg';
import Plus from '../../img/recruit/plus.svg';
import Min from '../../img/recruit/min.svg';
import { StyledButton } from './UnivcontentStyle';
import Apply1 from '../../img/recruit/apply1.svg';
import Apply2 from '../../img/recruit/apply2.svg';

const Univcontent = () => {
    const [selected, setSelected] = useState(null);
    const [hovered, setHovered] = useState(false);
  
    const handleClick = (index:any) => {
      if (selected === index) {
        setSelected(null);
      } else {
        setSelected(index);
      }
    };
  
    const goEmail = () => {
      window.open('mailto:univ_admin@likelion.net');
    };
  
    // Define the table object
    const table: { [key: string]: string } = {
        '’아기사자’가 무엇인가요?':
            '멋쟁이사자처럼 대학에 들어온 구성원들을 지칭하는 말입니다.',
        '대학 졸업생이나 직장인도 참여 가능한가요?':
            '아니요, 대학 기반 동아리이니만큼 재학생, 휴학생에 한해 지원할 수 있습니다.',

        '운영진 및 아기사자 지원은 어떻게 하나요?':
            '참여대학 페이지에 우리 학교가 있다면, 각 학교의 대표 페이지를 통해 문의해주세요. 만일 찾는 데에 어려움이 있다면, univ_admin@likelion.net 메일로 문의해주세요.',
        '중앙 운영단은 어떤 조직이며, 어떻게 구성되나요?':
            '중앙 운영단은 멋쟁이사자처럼 대학의 구성원 전체를 대표하는 조직으로, 운영팀, 콘텐츠팀으로 나뉘어 멋쟁이사자처럼과 직접적으로 소통하며 멋대를 이끌어나갈 예정입니다. 자세한 선발 내용은 1월 중순 중 발표될 모집 요강을 살펴봐 주세요.',

        '교육과 행사는 오프라인으로 진행되나요?':
            '학교별로 진행하는 교육은 각 학교 내부에서 자율적으로 진행하면 되며, 오프라인을 권장드립니다. 멋쟁이사자처럼에서 진행하는 행사의 경우 온/오프라인 행사가 혼합되어 있습니다.',
    };

    const question = '운영진 및 아기사자 지원은 어떻게 하나요?';

    const answer = table[question] || '';

    if (typeof document !== 'undefined') {
        const answerElement = document.getElementById('answer');
        if (answerElement) {
            answerElement.innerHTML = answer;
        }
    } else {
        console.log(answer);
    }

    return (
        <U.ContentDiv>
          <U.ContentSection>
            <U.StyledButton>
              <button className="button1">
      <U.StyledImg src={Apply1} alt="지원용이미지1" />
      
      <U.Text1>학교별 운영진 지원</U.Text1>
      
      <U.Text2>2024. 1. 15까지 모집</U.Text2>
  </button>
  
              
              
                <button className="button2">
                   <U.StyledImg src={Apply2} alt="지원용이미지2" />
                   
                  <U.Text3>중앙 운영진 지원</U.Text3>
                  <U.Text4>2024. 1. 16 ~ 1. 31 모집 예정</U.Text4>
                  </button>
            
            </U.StyledButton>
    
            <U.Title>
              <U.TD>FAQ</U.TD>
              <U.TD>자주 묻는 질문</U.TD>
            </U.Title>
    
            <U.Qbody3>
              {Object.entries(table).map(([key, value], index) => (
                <React.Fragment key={index}>
                  <U.Table
                    onClick={() => handleClick(index)}
                    style={{
                      background: selected === index ? 'white' : '#f2f4f6',
                      borderBottom: selected === index ? 'none' : '1px solid #212224',
                    }}
                  >
                    <div className="left-container">
                      <div>Q</div>
                      <div>{key}</div>
                    </div>
                    {selected === index ? <img src={Min} alt="이미지" /> : <img src={Plus} alt="이미지" />}
                  </U.Table>
    
                  {selected === index ? (
                    <U.AnsTable>
                      <div>A</div>
                      <div>{value}</div>
                    </U.AnsTable>
                  ) : null}
                </React.Fragment>
              ))}
            </U.Qbody3>
            <U.Ps2>
              <p>더 궁금한 것이 있으신가요?</p>
              <img src={hovered ? Email2 : Mail} alt="이미지" />
              <p
                onClick={goEmail}
                style={{ color: hovered ? '#FF7710' : '#212224' }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                이메일로 문의하기
              </p>
            </U.Ps2>
          </U.ContentSection>
        </U.ContentDiv>
      );
    };
    
    export { Univcontent };
    