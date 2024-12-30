import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { NextPage } from 'next';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import { Stack, Box, Button, Pagination, Typography } from '@mui/material';
import { Menu, MenuItem } from '@mui/material';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import AgentCard from '../../libs/components/common/AgentCard';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Member } from '../../libs/types/member/member';
import { useMutation, useQuery } from '@apollo/client';
import { LIKE_CAR, LIKE_MEMBER } from '../../apollo/user/mutation';
import { GET_AGENTS, GET_CARS, GET_MEMBER } from '../../apollo/user/query';
import { sweetMixinErrorAlert, sweetMixinSuccessAlert } from '../../libs/sweetAlert';
import { Direction, Message } from '../../libs/enums/common.enum';
import { Messages } from '../../libs/config';
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined';
import DealerCard from '../../libs/components/common/DealerCard';
import PropertyCard from '../../libs/components/car/MainCarCard';
import { T } from '../../libs/types/common';
import { Property } from '../../libs/types/property/property';
import { Car } from '../../libs/types/car/car';
import MainCarCard from '../../libs/components/car/MainCarCard';


export const getStaticProps = async ({ locale }: any) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
});

const DealerCarsList: NextPage = ({ initialInput, ...props }: any) => {
    const device = useDeviceDetect();
    const router = useRouter();
    const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
    const [cars, setCars] = useState<Car[]>([]);
    const [filterSortName, setFilterSortName] = useState('Recent');
    const [sortingOpen, setSortingOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [searchFilter, setSearchFilter] = useState<any>(
        router?.query?.input ? JSON.parse(router?.query?.input as string) : '',
    );
    const [member, setMember] = useState<Member>();
    const [dealerId, setDealerId] = useState<string | null>(null);
    const [total, setTotal] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);

    /** APOLLO REQUESTS **/
    const [likeTargetCar] = useMutation(LIKE_CAR);

    const {
        loading: getCarsLoading,
        data: getCarsData,
        error: getCarsError,
        refetch: getCarsRefetch,
    } = useQuery(GET_CARS, {
        fetchPolicy: 'network-only',
        variables: {
            input: {
                page: 1,
                limit: 4,
                sort: 'createdAt',
                direction: Direction.DESC,
                search: {
                    memberId: member?._id
                }
            },
        },
        notifyOnNetworkStatusChange: true,
        onCompleted: (data) => {
            setCars(data?.getCars?.list);
            setTotal(data?.getCars?.metaCounter[0]?.total);
        },
    });

    const {
        loading: getMemberLoading,
        data: getMemberData,
        error: getMemberError,
        refetch: getMemberRefetch
    } = useQuery(GET_MEMBER, {
        fetchPolicy: 'network-only',
        variables: { input: dealerId },
        notifyOnNetworkStatusChange: true,
        onCompleted: (data: T) => {
            setMember(data?.getMember?.list);
        },
    });
    /** LIFECYCLES **/
    useEffect(() => {
        if (router.query.input) {
            const input_obj = JSON.parse(router?.query?.input as string);
            setSearchFilter(input_obj);
        } else
            setCurrentPage(searchFilter.page === undefined ? 1 : searchFilter.page);
    }, [router]);

    useEffect(() => {
        if (router?.query?.dealerId) {
            setDealerId(router?.query?.dealerId as string);
        }
    }, [router])

    /** HANDLERS **/
    const sortingClickHandler = (e: MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
        setSortingOpen(true);
    };

    const sortingCloseHandler = () => {
        setSortingOpen(false);
        setAnchorEl(null);
    };

    const sortingHandler = (e: React.MouseEvent<HTMLLIElement>) => {
        switch (e.currentTarget.id) {
            case 'recent':
                setSearchFilter({ ...searchFilter, sort: 'createdAt', direction: 'DESC' });
                setFilterSortName('Recent');
                break;
            case 'old':
                setSearchFilter({ ...searchFilter, sort: 'createdAt', direction: 'ASC' });
                setFilterSortName('Oldest order');
                break;
            case 'likes':
                setSearchFilter({ ...searchFilter, sort: 'carLikes', direction: 'DESC' });
                setFilterSortName('Likes');
                break;
            case 'views':
                setSearchFilter({ ...searchFilter, sort: 'carViews', direction: 'DESC' });
                setFilterSortName('Views');
                break;
        }
        setSortingOpen(false);
        setAnchorEl2(null);
    };

    const paginationChangeHandler = async (event: ChangeEvent<unknown>, value: number) => {
        searchFilter.page = value;
        await router.push(`/dealers/car?input=${JSON.stringify(searchFilter)}`, `/dealers/car?input=${JSON.stringify(searchFilter)}`, {
            scroll: false,
        });
        setCurrentPage(value);
    };

    const likeCarHandler = async (user: any, id: string) => {
        try {
            if (!id) return;
            if (!user._id) throw new Error(Messages.error2);

            await likeTargetCar({
                variables: {
                    input: id,
                },
            });

            await getCarsRefetch({ input: searchFilter });
            await sweetMixinSuccessAlert('success', 800);
        } catch (err: any) {
            sweetMixinErrorAlert(err.message).then();
        }
    }


    if (device === 'mobile') {
        return <h1>DEALER CARS PAGE MOBILE</h1>;
    } else {
        return (
            <Stack className={'car-page'}>
                <Stack className={'container'}>
                    <Stack className={'card-wrap'}>
                        {cars?.length === 0 ? (
                            <div className={'no-data'}>
                                <img src="/img/icons/icoAlert.svg" alt="" />
                                <p>No Dealer Cars found!</p>
                            </div>
                        ) : (
                            cars?.map((car: Car) => {
                                return <MainCarCard car={car} key={car?._id} likeCarHandler={likeCarHandler} />;
                            })
                        )}
                    </Stack>
                    <Stack className={'pagination'}>
                        <Stack className="pagination-box">
                            {cars?.length !== 0 && Math.ceil(total / searchFilter.limit) > 1 && (
                                <Stack className="pagination-box">
                                    <Pagination
                                        page={currentPage}
                                        count={Math.ceil(total / searchFilter.limit)}
                                        onChange={paginationChangeHandler}
                                        shape="rounded"
                                        color="secondary"
                                    />
                                </Stack>
                            )}
                        </Stack>

                        {cars?.length !== 0 && (
                            <span>
                                Total {total} car{total > 1 ? 's' : ''} available
                            </span>
                        )}
                    </Stack>
                </Stack>
            </Stack>
        );
    }
};

export default withLayoutBasic(DealerCarsList);