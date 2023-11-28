import Select, { components } from 'react-select';
import { OptionType } from './type';
import { ReactComponent as Arrow } from '../../img/arrow.svg';
import { useEffect, useState } from 'react';

interface SortType {
    select: string;
}

const options: OptionType[] = [
    { value: 1, label: '최신순' },
    { value: 2, label: '좋아요순' },
    { value: 3, label: '댓글순' },
];

const SortBox = (props: SortType) => {
    const [selectedOption, setSelectedOption] = useState<OptionType | null>(
        null,
    );

    useEffect(() => {
        setSelectedOption(null);
    }, [props.select]);

    const handleSortChange = (selectedOption: OptionType | null) => {
        setSelectedOption(selectedOption); // 선택된 값을 상태로 업데이트합니다.

        if (!selectedOption) return;

        switch (selectedOption.value) {
            case 1:
                console.log('최신순');
                break;
            case 2:
                console.log('좋아요순');
                break;
            case 3:
                console.log('댓글순');
                break;
            default:
                break;
        }
    };

    const DropdownIndicator = (props: any) => {
        return (
            <components.DropdownIndicator {...props}>
                <Arrow
                    style={{
                        transform: props.selectProps.menuIsOpen
                            ? 'rotate(0deg)'
                            : 'rotate(180deg)',
                        stroke: props.selectProps.menuIsOpen
                            ? '#212224'
                            : '#212224',
                    }}
                ></Arrow>
            </components.DropdownIndicator>
        );
    };

    return (
        <>
            <Select
                options={options}
                value={selectedOption}
                styles={orderStyle}
                isSearchable={false}
                placeholder="최신순"
                components={{ DropdownIndicator }}
                maxMenuHeight={136}
                onChange={handleSortChange}
                blurInputOnSelect={true}
            />
        </>
    );
};

export default SortBox;

const orderStyle = {
    indicatorSeparator: () => ({
        backgroundColor: 'transparent',
    }),
    // valueContainer: () => ({
    //     display: 'flex',
    // }),
    placeholder: () => ({
        color: 'var(--Grey-900, #212224)',
        fontSize: '16px',
        marginTop: '-20px',
    }),
    control: (provided: any, state: any) => ({
        ...provided,
        paddingLeft: '2px',
        fontFamily: 'Pretendard',
        fontSize: '16px',
        fontWeight: '500',
        border: '1px solid var(--grey-400, #DCDFE3)',
        width: state.isFocused ? '106px' : '106px',
        height: state.isFocused ? '40px' : '40px',
        borderRadius: '6px',
        backgroundColor: 'white',
        boxShadow: '0 0 0 0px transparent',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&:hover': {
            border: '1px solid var(--grey-400, #DCDFE3)',
        },
    }),
    menu: (provided: any) => ({
        ...provided,
        borderRadius: '6px',
        boxShadow: '0 0 0 0px transparent',
        border: '1px solid var(--grey-400, #DCDFE3)',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '106px',
    }),
    menuList: (provided: any) => ({
        ...provided,
        backgroundColor: 'transparent',
        maxHeight: '136px',
        width: '100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
    }),
    option: (provided: any, state: any) => ({
        ...provided,
        padding: '4px',
        paddingLeft: '12px',
        fontFamily: 'Pretendard',
        fontSize: '16px',
        fontWeight: '500',
        width: '100px',
        height: '40px',
        color: 'var(--grey-900, #212224)',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0,
        backgroundColor: state.isFocused
            ? 'var(--grey-300, #EAECEE)'
            : state.isSelected
            ? 'var(--grey-300, #EAECEE)'
            : provided.backgroundColor,
        '&:active': {
            backgroundColor: 'var(--grey-400, #DCDFE3)',
        },
    }),
};