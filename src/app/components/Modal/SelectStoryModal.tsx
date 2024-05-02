import { Flex } from '@mantine/core';
import React from 'react';
import ReactDOM from 'react-dom';
import { StyledLabel } from '../Common/StyledLabel';
import { StyledImage } from '../Common/Image';

const SelectStoryModal = ({ isShowing, hide }: any) => {
    console.log('isshowing: ', isShowing);
    return isShowing ? (
        <Flex
            sx={{
                position: 'fixed',
                zIndex: 99,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.5)',
                left: 0, top: 0, alignItems: 'center',
                justifyContent: 'center'
            }}>
            <div style={{ width: '70%', height: '80%', background: 'white', borderRadius: '9px', border: 'solid white' }}>
                <Flex direction={'column'}  sx={{height: '90%'}}>
                    <Flex sx={{ padding: '8px' }}>
                        <StyledLabel title={'Chọn truyện'} color='#0' />
                    </Flex>
                    <div style={{ width: '100%', opacity: '70%', height: '1px', backgroundColor: 'grey' }} />
                    <Flex sx={{padding: '12px'}}>
                    <table border={1} width={'100%'}>
                        <tbody>
                            <tr >
                                <td style={{width: '20%', height: '20%'}}>
                                    <StyledImage src={'https://tranhdecors.com/wp-content/uploads/edd/2023/09/Anh-nen-Anime-tieu-tho-anh-dao-1200x900.jpg'} />
                                </td>
                                <td>
                                    <Flex direction={'column'}>
                                    <StyledLabel title={'Tên truyện: '} fontSize={'1.2rem'} color='#000000'/>
                                    <StyledLabel title={'Tác giả: '} fontSize={'1.2rem'} color='#000000'/>
                                    <StyledLabel title={'Lượt xem: '} fontSize={'1.2rem'} color='#000000'/>
                                    </Flex>
                                </td>
                                <td style={{width: '10%'}}>
                                    <Flex sx={{padding: '4px', gap: '2px'}}>
                                    <StyledLabel title='Chọn' fontSize={'1.2rem'} color='#000000' />
                                    <input type='radio' />
                                    </Flex>

                                </td>
                            </tr>
                            
                        </tbody>
                    </table>
                    </Flex>
                </Flex>
                <Flex justify={'center'} style={{zIndex: 99, width: '100%', borderTop: '1px solid #e5e5e5', padding: '16px'}}>
                    <button>
                        {'Chọn'}
                    </button>
                    <button onClick={hide}>
                        {'Đóng'}
                    </button>
                </Flex>
            </div>
        </Flex>
    ) : null;
};


export default SelectStoryModal;
