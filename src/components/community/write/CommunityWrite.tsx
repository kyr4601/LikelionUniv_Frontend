import Editor from './Editor';
import * as W from './WriteStyle';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import request from '../../../utils/request';
import { useNavigate } from 'react-router-dom';
import ImageUpload, { PresignedUrlResponse } from '../../utils/ImageUpload';

interface CommunityRegisterType {
    title: string;
    body: string;
    thumbnail: string | null;
    mainCategory: string;
    subCategory: string;
}

interface PostId {
    postId: number;
}

const CommunityWrite = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const info = { ...location.state };
    const [selectedBoard, setSelectedBoard] = useState<string>('' || info.main);
    const [selectedSubBoard, setSelectedSubBoard] = useState<string>('' || info.sub);
    const [editorTitle, setEditorTitle] = useState(info.title || '');
    const [editorContent, setEditorContent] = useState(info.body || '');

    const isSubmitEnabled = () => {
        return selectedBoard && selectedSubBoard && editorTitle && editorContent;
    };

    const handleTitleChange = (title:string) => {
        setEditorTitle(title);
    };
    
    const handleContentChange = (content:string) => {
        setEditorContent(content);
    };
    

    const BoardClick = (boardName: string) => {
        setSelectedBoard(boardName);
        setSelectedSubBoard('');
    };

    const SubBoardClick = (subBoardName: string) => {
        setSelectedSubBoard(subBoardName);
    };

    const replaceBase64WithS3Urls = (originalHtml:any, base64Urls:any, s3Urls:any) => {
        let newHtml = originalHtml;
      
        base64Urls.forEach((base64Url:any, index:any) => {
          newHtml = newHtml.replace(base64Url, s3Urls[index]);
        });
      
        return newHtml;
      };

    const processSendData = async (): Promise<CommunityRegisterType> => {

        const editorHtml = editorContent;
        const base64Urls = extractBase64Images(editorHtml);
        let thumbnailUrl = null;
        
        let newEditorHtml = editorHtml;
        if (base64Urls.length > 0) {
            const s3Urls = await uploadImagesAndGetUrls(base64Urls);
            newEditorHtml = replaceBase64WithS3Urls(editorHtml, base64Urls, s3Urls);

            if (s3Urls.length > 0) {
                thumbnailUrl = s3Urls[0];
            }
        }


        return {
            title: editorTitle,
            body: newEditorHtml,
            thumbnail: thumbnailUrl,
            mainCategory: selectedBoard,
            subCategory: selectedSubBoard
        };
    };

    // 게시글 등록
    const handleSubmit = async () => {
        const data = await processSendData();
        const response = await request<CommunityRegisterType, PostId, null>({
            uri: '/api/v1/community/posts/new',
            method: 'post',
            data,
        });

        navigate('/community');
        console.log(response)
    };

    // 게시글 수정
    const handleModify = async () => {
        const data = await processSendData();
        const response = await request<CommunityRegisterType, null, PostId>({
            uri: `/api/v1/community/posts/${info.id}`,
            method: 'patch',
            data,
        });

        navigate('/community');
        console.log(response)
    };

    const submit = () => {
        if(info.mod){
            handleSubmit();
        }else {
            handleModify();
        }
    }

    //quill editor 내용 중 img 태그만 골라서 src 뽑아내기
    const extractBase64Images = (editorContent:any) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(editorContent, 'text/html');
        const images = doc.querySelectorAll('img');
        const urls = Array.from(images).map(img => img.src);
        return urls;
    };

    const base64ToFile = (dataurl:any, filename:string) => {
        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
    
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
    
        return new File([u8arr], filename, { type: mime });
    };
    
    
    const uploadImagesAndGetUrls = async (base64Urls:any) => {
        const s3Urls = [];
      
        for (const base64Url of base64Urls) {
          const file = base64ToFile(base64Url, "image.jpg");
          const { presignedUrl, imageUrl } = await ImageUpload.getPresignedUrl(file);
          await ImageUpload.enrollImagesToS3(file, presignedUrl);
          s3Urls.push('https://' + imageUrl);
        }
      
        return s3Urls;
    };

    const goMain = () => {
        navigate("/community")
    }

    const SubBoard = () => {
        switch (selectedBoard) {
            case '멋대 중앙':
                return (
                    <div className="subBoard">
                        <W.SubBoardItem
                            onClick={() => SubBoardClick('공지사항')}
                            isSelected={selectedSubBoard === '공지사항'}
                        >
                            공지사항
                        </W.SubBoardItem>
                        <W.SubBoardItem
                            onClick={() => SubBoardClick('질문건의')}
                            isSelected={selectedSubBoard === '질문건의'}
                        >
                            질문건의
                        </W.SubBoardItem>
                        <W.SubBoardItem
                            onClick={() => SubBoardClick('정보공유')}
                            isSelected={selectedSubBoard === '정보공유'}
                        >
                            정보공유
                        </W.SubBoardItem>
                    </div>
                );
            case '자유게시판':
                return (
                    <div className="subBoard">
                        <W.SubBoardItem
                            onClick={() => SubBoardClick('정보공유')}
                            isSelected={selectedSubBoard === '정보공유'}
                        >
                            정보공유
                        </W.SubBoardItem>
                        <W.SubBoardItem
                            onClick={() => SubBoardClick('팀원모집')}
                            isSelected={selectedSubBoard === '팀원모집'}
                        >
                            팀원모집
                        </W.SubBoardItem>
                        <W.SubBoardItem
                            onClick={() => SubBoardClick('플젝모집')}
                            isSelected={selectedSubBoard === '플젝모집'}
                        >
                            플젝모집
                        </W.SubBoardItem>
                        <W.SubBoardItem
                            onClick={() => SubBoardClick('플젝자랑')}
                            isSelected={selectedSubBoard === '플젝자랑'}
                        >
                            플젝자랑
                        </W.SubBoardItem>
                    </div>
                );
            case '멋사 오버플로우':
                return (
                    <div className="subBoard">
                        <W.SubBoardItem
                            onClick={() => SubBoardClick('프론트')}
                            isSelected={selectedSubBoard === '프론트'}
                        >
                            프론트
                        </W.SubBoardItem>
                        <W.SubBoardItem
                            onClick={() => SubBoardClick('백')}
                            isSelected={selectedSubBoard === '백'}
                        >
                            백
                        </W.SubBoardItem>
                        <W.SubBoardItem
                            onClick={() => SubBoardClick('기획')}
                            isSelected={selectedSubBoard === '기획'}
                        >
                            기획
                        </W.SubBoardItem>
                        <W.SubBoardItem
                            onClick={() => SubBoardClick('디자인')}
                            isSelected={selectedSubBoard === '디자인'}
                        >
                            디자인
                        </W.SubBoardItem>
                        <W.SubBoardItem
                            onClick={() => SubBoardClick('기타')}
                            isSelected={selectedSubBoard === '기타'}
                        >
                            기타
                        </W.SubBoardItem>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <W.Container>
            <W.Title>커뮤니티 글쓰기</W.Title>
            <W.Tab>
                <p className="sub">게시판 선택</p>
                <div className="board">
                    <W.BoardItem
                        onClick={() => BoardClick('멋대 중앙')}
                        isSelected={selectedBoard === '멋대 중앙'}
                    >
                        멋대 중앙
                    </W.BoardItem>
                    <W.BoardItem
                        onClick={() => BoardClick('자유게시판')}
                        isSelected={selectedBoard === '자유게시판'}
                    >
                        자유게시판
                    </W.BoardItem>
                    <W.BoardItem
                        onClick={() => BoardClick('멋사 오버플로우')}
                        isSelected={selectedBoard === '멋사 오버플로우'}
                    >
                        멋사 오버플로우
                    </W.BoardItem>
                </div>
                {SubBoard()}
            </W.Tab>
            <Editor 
                contents={info.body} 
                title={info.title} 
                onTitleChange={handleTitleChange}
                onContentChange={handleContentChange}
            />
            <div className='btns'>
                <W.CancelBtn onClick={goMain}>취소하기</W.CancelBtn>
                <W.RegBtn
                isActive={isSubmitEnabled()}
                onClick={isSubmitEnabled() ? handleSubmit : undefined} >등록하기</W.RegBtn>
            </div>
        </W.Container>
    );
};

export default CommunityWrite;
