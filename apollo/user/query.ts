import { gql } from '@apollo/client';

/**************************
 *         MEMBER         *
 *************************/

export const GET_AGENTS = gql`
query GetAgents($input: ADSInquiry!) {
    getAgents(input: $input) {
        metaCounter {
            total
        }
        list {
            _id
            type
            status
            authType
            titleNick
            fullName
            image
            images
            location
            address
            shortDesc
            longDesc
            phone
            phone2
            email
            kakaoTalk
            youtube
            instagram
            facebook
            tikTok
            naverBlog
            xcom
            followers
            followings
            likes
            views
            comments
            warnings
            articles
            blocks
            memberCars
            usedCars
            newCars
            rank
            points
            sellerProducts
            dealerBrand
            dealerFinancing
            dealerCarService
            dealerTradeIn
            dealerCustomization
            dealerWarranties
            dealerParts
            dealerAccessories
            dealerCarDetailing
            dealerCarWash
            dealerCarTestDrive
            dealerCarDelivery
            dealerPlusService
            carServiceType
            carOilChange
            carAlignment
            carTireChange
            carBrakeCheck
            carBatteryCheck
            carTireBalance
            carSuspension
            carAirCondition
            carTransmissionCheck
            carEngineDiagnostic
            carExhaust
            carDetailing
            carWindshield
            carTimingBelt
            carChainReplacement
            comfort
            performance
            exterior
            interior
            reliability
            fast
            openAt
            closeAt
            openSunday
            closeSunday
            openSaturday
            closeSaturday
            publicHolidays
            deletedAt
            createdAt
            updatedAt
            accessToken
        }
    }
}`;

export const GET_DEALERS = gql`
query GetDealers($input: ADSInquiry!) {
    getDealers(input: $input) {
        metaCounter {
            total
        }
        list {
            _id
            type
            status
            authType
            titleNick
            fullName
            image
            images
            location
            address
            shortDesc
            longDesc
            phone
            phone2
            email
            kakaoTalk
            youtube
            instagram
            facebook
            tikTok
            naverBlog
            xcom
            followers
            followings
            likes
            views
            comments
            warnings
            articles
            blocks
            memberCars
            usedCars
            newCars
            rank
            points
            sellerProducts
            dealerBrand
            dealerFinancing
            dealerCarService
            dealerTradeIn
            dealerCustomization
            dealerWarranties
            dealerParts
            dealerAccessories
            dealerCarDetailing
            dealerCarWash
            dealerCarTestDrive
            dealerCarDelivery
            dealerPlusService
            carServiceType
            carOilChange
            carAlignment
            carTireChange
            carBrakeCheck
            carBatteryCheck
            carTireBalance
            carSuspension
            carAirCondition
            carTransmissionCheck
            carEngineDiagnostic
            carExhaust
            carDetailing
            carWindshield
            carTimingBelt
            carChainReplacement
            comfort
            performance
            exterior
            interior
            reliability
            fast
            openAt
            closeAt
            openSunday
            closeSunday
            openSaturday
            closeSaturday
            publicHolidays
            deletedAt
            createdAt
            updatedAt
            accessToken
            meFollowed {
                followingId
                followerId
                myFollowing
            }
            meLiked {
                memberId
                likeRefId
                myFavorite
            }
        }
    }
}`;

export const GET_SERVICES = gql`
query GetServices($input: ADSInquiry!) {
    getServices(input: $input) {
        metaCounter {
            total
        }
        list {
            _id
            type
            status
            authType
            titleNick
            fullName
            image
            images
            location
            address
            shortDesc
            longDesc
            phone
            phone2
            email
            kakaoTalk
            youtube
            instagram
            facebook
            tikTok
            naverBlog
            xcom
            followers
            followings
            likes
            views
            comments
            warnings
            articles
            blocks
            memberCars
            usedCars
            newCars
            rank
            points
            sellerProducts
            dealerBrand
            dealerFinancing
            dealerCarService
            dealerTradeIn
            dealerCustomization
            dealerWarranties
            dealerParts
            dealerAccessories
            dealerCarDetailing
            dealerCarWash
            dealerCarTestDrive
            dealerCarDelivery
            dealerPlusService
            carServiceType
            carOilChange
            carAlignment
            carTireChange
            carBrakeCheck
            carBatteryCheck
            carTireBalance
            carSuspension
            carAirCondition
            carTransmissionCheck
            carEngineDiagnostic
            carExhaust
            carDetailing
            carWindshield
            carTimingBelt
            carChainReplacement
            comfort
            performance
            exterior
            interior
            reliability
            fast
            openAt
            closeAt
            openSunday
            closeSunday
            openSaturday
            closeSaturday
            publicHolidays
            deletedAt
            createdAt
            updatedAt
            accessToken
            meFollowed {
                followingId
                followerId
                myFollowing
            }
            meLiked {
                memberId
                likeRefId
                myFavorite
            }
        }
    }
}`;

// export const GET_AGENTS = gql`
// 	query GetAgents($input: AgentsInquiry!) {
// 		getAgents(input: $input) {
// 			list {
// 				_id
// 				memberType
// 				memberStatus
// 				memberAuthType
// 				memberPhone
// 				memberNick
// 				memberFullName
// 				memberImage
// 				memberAddress
// 				memberDesc
// 				memberWarnings
// 				memberBlocks
// 				memberProperties
// 				memberRank
// 				memberPoints
// 				memberLikes
// 				memberViews
// 				deletedAt
// 				createdAt
// 				updatedAt
// 				accessToken
// 				meLiked {
// 					memberId
// 					likeRefId
// 					myFavorite
// 				}
// 			}
// 			metaCounter {
// 				total
// 			}
// 		}
// 	}
// `;

export const GET_MEMBER = gql`
query GetMember($input: String!) {
    getMember(memberId: $input) {
        _id
        type
        status
        authType
        titleNick
        fullName
        image
        images
        location
        address
        shortDesc
        longDesc
        phone
        phone2
        email
        kakaoTalk
        youtube
        instagram
        facebook
        tikTok
        naverBlog
        xcom
        followers
        followings
        likes
        views
        comments
        warnings
        articles
        blocks
        memberCars
        usedCars
        newCars
        rank
        points
        sellerProducts
        dealerBrand
        dealerFinancing
        dealerCarService
        dealerTradeIn
        dealerCustomization
        dealerWarranties
        dealerParts
        dealerAccessories
        dealerCarDetailing
        dealerCarWash
        dealerCarTestDrive
        dealerCarDelivery
        dealerPlusService
        carServiceType
        carOilChange
        carAlignment
        carTireChange
        carBrakeCheck
        carBatteryCheck
        carTireBalance
        carSuspension
        carAirCondition
        carTransmissionCheck
        carEngineDiagnostic
        carExhaust
        carDetailing
        carWindshield
        carTimingBelt
        carChainReplacement
        comfort
        performance
        exterior
        interior
        reliability
        fast
        openAt
        closeAt
        openSunday
        closeSunday
        openSaturday
        closeSaturday
        publicHolidays
        deletedAt
        createdAt
        updatedAt
        accessToken
        meFollowed {
            followingId
            followerId
            myFollowing
        }
        meLiked {
            memberId
            likeRefId
            myFavorite
        }
    }
}`;

// export const GET_MEMBER = gql(`
// query GetMember($input: String!) {
//     getMember(memberId: $input) {
//         _id
//         memberType
//         memberStatus
//         memberAuthType
//         memberPhone
//         memberNick
//         memberFullName
//         memberImage
//         memberAddress
//         memberDesc
//         memberProperties
//         memberArticles
//         memberPoints
//         memberLikes
//         memberViews
//         memberFollowings
// 				memberFollowers
//         memberRank
//         memberWarnings
//         memberBlocks
//         deletedAt
//         createdAt
//         updatedAt
//         accessToken
//         meFollowed {
// 					followingId
// 					followerId
// 					myFollowing
// 				}
//     }
// }
// `);

/**************************
 *        PRODUCT         *
 *************************/

export const GET_PRODUCT = gql`
query GetProduct($input: String!) {
    getProduct(productId: $input) {
        _id
        productType
        productStatus
        productTitle
        productPrice
        productQuantity
        productImages
        productShortDesc
        productDesc
        productViews
        productLikes
        productSave
        productComments
        productRank
        memberId
        deletedAt
        createdAt
        updatedAt
        meLiked {
            memberId
            likeRefId
            myFavorite
        }
        creatorData {
            _id
            type
            status
            authType
            titleNick
            fullName
            image
            images
            location
            address
            shortDesc
            longDesc
            phone
            phone2
            email
            kakaoTalk
            youtube
            instagram
            facebook
            tikTok
            naverBlog
            xcom
            followers
            followings
            likes
            views
            comments
            warnings
            articles
            blocks
            memberCars
            usedCars
            newCars
            rank
            points
            sellerProducts
            dealerBrand
            dealerFinancing
            dealerCarService
            dealerTradeIn
            dealerCustomization
            dealerWarranties
            dealerParts
            dealerAccessories
            dealerCarDetailing
            dealerCarWash
            dealerCarTestDrive
            dealerCarDelivery
            dealerPlusService
            carServiceType
            carOilChange
            carAlignment
            carTireChange
            carBrakeCheck
            carBatteryCheck
            carTireBalance
            carSuspension
            carAirCondition
            carTransmissionCheck
            carEngineDiagnostic
            carExhaust
            carDetailing
            carWindshield
            carTimingBelt
            carChainReplacement
            comfort
            performance
            exterior
            interior
            reliability
            fast
            openAt
            closeAt
            openSunday
            closeSunday
            openSaturday
            closeSaturday
            publicHolidays
            deletedAt
            createdAt
            updatedAt
            accessToken
            meFollowed {
                followingId
                followerId
                myFollowing
            }
            meLiked {
                memberId
                likeRefId
                myFavorite
            }
        }
    }
}`;

export const GET_PRODUCTS = gql`
query GetProducts($input: ProductsInquiry!) {
    getProducts(input: $input) {
        metaCounter {
            total
        }
        list {
            _id
            productType
            productStatus
            productTitle
            productPrice
            productQuantity
            productImages
            productShortDesc
            productDesc
            productViews
            productLikes
            productSave
            productComments
            productRank
            memberId
            deletedAt
            createdAt
            updatedAt
            meLiked {
                memberId
                likeRefId
                myFavorite
            }
            creatorData {
                _id
                type
                status
                authType
                titleNick
                fullName
                image
                images
                location
                address
                shortDesc
                longDesc
                phone
                phone2
                email
                kakaoTalk
                youtube
                instagram
                facebook
                tikTok
                naverBlog
                xcom
                followers
                followings
                likes
                views
                comments
                warnings
                articles
                blocks
                memberCars
                usedCars
                newCars
                rank
                points
                sellerProducts
                dealerBrand
                dealerFinancing
                dealerCarService
                dealerTradeIn
                dealerCustomization
                dealerWarranties
                dealerParts
                dealerAccessories
                dealerCarDetailing
                dealerCarWash
                dealerCarTestDrive
                dealerCarDelivery
                dealerPlusService
                carServiceType
                carOilChange
                carAlignment
                carTireChange
                carBrakeCheck
                carBatteryCheck
                carTireBalance
                carSuspension
                carAirCondition
                carTransmissionCheck
                carEngineDiagnostic
                carExhaust
                carDetailing
                carWindshield
                carTimingBelt
                carChainReplacement
                comfort
                performance
                exterior
                interior
                reliability
                fast
                openAt
                closeAt
                openSunday
                closeSunday
                openSaturday
                closeSaturday
                publicHolidays
                deletedAt
                createdAt
                updatedAt
                accessToken
                meFollowed {
                    followingId
                    followerId
                    myFollowing
                }
                meLiked {
                    memberId
                    likeRefId
                    myFavorite
                }
            }
        }
    }
}`;


/**************************
 *        PROPERTY        *
 *************************/

export const GET_CAR = gql`
query GetCar($input: String!) {
    getCar(carId: $input) {
        _id
        carType
        carTitle
        carBody
        carStatus
        carSort
        carGroup
        carMadeIn
        carBrand
        carModel
        carPrice
        carImages
        carVideo
        carLocation
        carAddress
        carDesc
        carBarter
        carRent
        carYear
        carTuning
        carTuningType
        carMileage
        carFuelType
        carDriveType
        carTransmission
        carEngineSize
        carColor
        carFullFuel
        carMpgHw
        carMpgCity
        carDoor
        carCylinders
        carMaxSpeed
        carHundredSpeed
        carHorsePower
        carTorque
        carLength
        carHeigth
        carWidth
        carSeatsUp
        carWeigth
        carLoadWeight
        carTireSize
        carWheelBase
        carAutoBrake
        carCruiseControl
        carESC
        carAutonomuosDrive
        carExteriorLight
        carPanoramicSunroof
        carHeatedSeats
        carCooledSeats
        carTouchscreenDisplay
        carAutoHeadLight
        carStarStop
        carNoiseCancellation
        carRemoteKeyless
        carLaneDW
        carBlindSpotMonitoring
        carRearCrossTrafficAlert
        carApplePlay
        carAndroidAuto
        carVoiceControl
        carBluetoothConnectivity
        carWirelessCharging
        carParkingAssist
        carSurroundViewCamera
        carFrontSensors
        carRearSensors
        carFrontRecordCamera
        carRearRecordCamera
        carHeadsUpDisplay
        carClimateControl
        carAdjustableSeats
        carMemorySeats
        carPowerTrain
        carRegenerativeBraking
        carTractionControl
        carStabilityControl
        carHillStartAssist
        carTirePressureSystem
        carPushButton
        carCrush
        carRepair
        carFrontBumper
        carBackBumper
        carBonnet
        carTailgate
        carRightFrontWing
        carLeftFrontWing
        carRightBackWing
        carLeftBackWing
        carRoof
        carRightFrontDoor
        carLeftFrontDoor
        carRightBackDoor
        carLeftBackDoor
        carViews
        carLikes
        carSave
        carComments
        carRank
        memberId
        soldAt
        deletedAt
        createdAt
        updatedAt
        meSaved {
            memberId
            saveRefId
            mySaved
        }
        meLiked {
            memberId
            likeRefId
            myFavorite
        }
        creatorData {
            _id
            type
            status
            authType
            titleNick
            fullName
            image
            images
            location
            address
            shortDesc
            longDesc
            phone
            phone2
            email
            kakaoTalk
            youtube
            instagram
            facebook
            tikTok
            naverBlog
            xcom
            followers
            followings
            likes
            views
            comments
            warnings
            articles
            blocks
            memberCars
            usedCars
            newCars
            rank
            points
            sellerProducts
            dealerBrand
            dealerFinancing
            dealerCarService
            dealerTradeIn
            dealerCustomization
            dealerWarranties
            dealerParts
            dealerAccessories
            dealerCarDetailing
            dealerCarWash
            dealerCarTestDrive
            dealerCarDelivery
            dealerPlusService
            carServiceType
            carOilChange
            carAlignment
            carTireChange
            carBrakeCheck
            carBatteryCheck
            carTireBalance
            carSuspension
            carAirCondition
            carTransmissionCheck
            carEngineDiagnostic
            carExhaust
            carDetailing
            carWindshield
            carTimingBelt
            carChainReplacement
            comfort
            performance
            exterior
            interior
            reliability
            fast
            openAt
            closeAt
            openSunday
            closeSunday
            openSaturday
            closeSaturday
            publicHolidays
            deletedAt
            createdAt
            updatedAt
            accessToken
            meFollowed {
                followingId
                followerId
                myFollowing
            }
            meLiked {
                memberId
                likeRefId
                myFavorite
            }
        }
    }
}`;

// export const GET_PROPERTY = gql`
// 	query GetProperty($input: String!) {
// 		getProperty(propertyId: $input) {
// 			_id
// 			propertyType
// 			propertyStatus
// 			propertyLocation
// 			propertyAddress
// 			propertyTitle
// 			propertyPrice
// 			propertySquare
// 			propertyBeds
// 			propertyRooms
// 			propertyViews
// 			propertyLikes
// 			propertyImages
// 			propertyDesc
// 			propertyBarter
// 			propertyRent
// 			memberId
// 			soldAt
// 			deletedAt
// 			constructedAt
// 			createdAt
// 			updatedAt
// 			memberData {
// 				_id
// 				memberType
// 				memberStatus
// 				memberAuthType
// 				memberPhone
// 				memberNick
// 				memberFullName
// 				memberImage
// 				memberAddress
// 				memberDesc
// 				memberWarnings
// 				memberBlocks
// 				memberPoints
// 				memberLikes
// 				memberViews
// 				deletedAt
// 				createdAt
// 				updatedAt
// 				accessToken
// 			}
// 			meLiked {
// 				memberId
// 				likeRefId
// 				myFavorite
// 			}
// 		}
// 	}
// `;

export const GET_CARS = gql`
query GetCars($input: CarsInquiry!) {
    getCars(input: $input) {
        metaCounter {
            total
        }
        list {
            _id
            carType
            carTitle
            carBody
            carStatus
            carSort
            carGroup
            carMadeIn
            carBrand
            carModel
            carPrice
            carImages
            carVideo
            carLocation
            carAddress
            carDesc
            carBarter
            carRent
            carYear
            carTuning
            carTuningType
            carMileage
            carFuelType
            carDriveType
            carTransmission
            carEngineSize
            carColor
            carFullFuel
            carMpgHw
            carMpgCity
            carDoor
            carCylinders
            carMaxSpeed
            carHundredSpeed
            carHorsePower
            carTorque
            carLength
            carHeigth
            carWidth
            carSeatsUp
            carWeigth
            carLoadWeight
            carTireSize
            carWheelBase
            carAutoBrake
            carCruiseControl
            carESC
            carAutonomuosDrive
            carExteriorLight
            carPanoramicSunroof
            carHeatedSeats
            carCooledSeats
            carTouchscreenDisplay
            carAutoHeadLight
            carStarStop
            carNoiseCancellation
            carRemoteKeyless
            carLaneDW
            carBlindSpotMonitoring
            carRearCrossTrafficAlert
            carApplePlay
            carAndroidAuto
            carVoiceControl
            carBluetoothConnectivity
            carWirelessCharging
            carParkingAssist
            carSurroundViewCamera
            carFrontSensors
            carRearSensors
            carFrontRecordCamera
            carRearRecordCamera
            carHeadsUpDisplay
            carClimateControl
            carAdjustableSeats
            carMemorySeats
            carPowerTrain
            carRegenerativeBraking
            carTractionControl
            carStabilityControl
            carHillStartAssist
            carTirePressureSystem
            carPushButton
            carCrush
            carRepair
            carFrontBumper
            carBackBumper
            carBonnet
            carTailgate
            carRightFrontWing
            carLeftFrontWing
            carRightBackWing
            carLeftBackWing
            carRoof
            carRightFrontDoor
            carLeftFrontDoor
            carRightBackDoor
            carLeftBackDoor
            carViews
            carLikes
            carSave
            carComments
            carRank
            memberId
            soldAt
            deletedAt
            createdAt
            updatedAt
            meSaved {
                memberId
                saveRefId
                mySaved
            }
            meLiked {
                memberId
                likeRefId
                myFavorite
            }
            creatorData {
                _id
                type
                status
                authType
                titleNick
                fullName
                image
                images
                location
                address
                shortDesc
                longDesc
                phone
                phone2
                email
                kakaoTalk
                youtube
                instagram
                facebook
                tikTok
                naverBlog
                xcom
                followers
                followings
                likes
                views
                comments
                warnings
                articles
                blocks
                memberCars
                usedCars
                newCars
                rank
                points
                sellerProducts
                dealerBrand
                dealerFinancing
                dealerCarService
                dealerTradeIn
                dealerCustomization
                dealerWarranties
                dealerParts
                dealerAccessories
                dealerCarDetailing
                dealerCarWash
                dealerCarTestDrive
                dealerCarDelivery
                dealerPlusService
                carServiceType
                carOilChange
                carAlignment
                carTireChange
                carBrakeCheck
                carBatteryCheck
                carTireBalance
                carSuspension
                carAirCondition
                carTransmissionCheck
                carEngineDiagnostic
                carExhaust
                carDetailing
                carWindshield
                carTimingBelt
                carChainReplacement
                comfort
                performance
                exterior
                interior
                reliability
                fast
                openAt
                closeAt
                openSunday
                closeSunday
                openSaturday
                closeSaturday
                publicHolidays
                deletedAt
                createdAt
                updatedAt
                accessToken
                meFollowed {
                    followingId
                    followerId
                    myFollowing
                }
                meLiked {
                    memberId
                    likeRefId
                    myFavorite
                }
            }
        }
    }
}`;

// export const GET_PROPERTIES = gql`
// 	query GetProperties($input: PropertiesInquiry!) {
// 		getProperties(input: $input) {
// 			list {
// 				_id
// 				propertyType
// 				propertyStatus
// 				propertyLocation
// 				propertyAddress
// 				propertyTitle
// 				propertyPrice
// 				propertySquare
// 				propertyBeds
// 				propertyRooms
// 				propertyViews
// 				propertyLikes
// 				propertyRank
// 				propertyImages
// 				propertyDesc
// 				propertyBarter
// 				propertyRent
// 				memberId
// 				soldAt
// 				deletedAt
// 				constructedAt
// 				createdAt
// 				updatedAt
// 				memberData {
// 					_id
// 					memberType
// 					memberStatus
// 					memberAuthType
// 					memberPhone
// 					memberNick
// 					memberFullName
// 					memberImage
// 					memberAddress
// 					memberDesc
// 					memberWarnings
// 					memberBlocks
// 					memberProperties
// 					memberRank
// 					memberPoints
// 					memberLikes
// 					memberViews
// 					deletedAt
// 					createdAt
// 					updatedAt
// 				}
// 				meLiked {
// 					memberId
// 					likeRefId
// 					myFavorite
// 				}
// 			}
// 			metaCounter {
// 				total
// 			}
// 		}
// 	}
// `;

export const GET_ADCARS = gql`
query GetAgentDealerCars($input: AgentDealerCarsInquiry!) {
    getAgentDealerCars(input: $input) {
        metaCounter {
            total
        }
        list {
            _id
            carType
            carTitle
            carBody
            carStatus
            carSort
            carGroup
            carMadeIn
            carBrand
            carModel
            carPrice
            carImages
            carVideo
            carLocation
            carAddress
            carDesc
            carBarter
            carRent
            carYear
            carTuning
            carTuningType
            carMileage
            carFuelType
            carDriveType
            carTransmission
            carEngineSize
            carColor
            carFullFuel
            carMpgHw
            carMpgCity
            carDoor
            carCylinders
            carMaxSpeed
            carHundredSpeed
            carHorsePower
            carTorque
            carLength
            carHeigth
            carWidth
            carSeatsUp
            carWeigth
            carLoadWeight
            carTireSize
            carWheelBase
            carAutoBrake
            carCruiseControl
            carESC
            carAutonomuosDrive
            carExteriorLight
            carPanoramicSunroof
            carHeatedSeats
            carCooledSeats
            carTouchscreenDisplay
            carAutoHeadLight
            carStarStop
            carNoiseCancellation
            carRemoteKeyless
            carLaneDW
            carBlindSpotMonitoring
            carRearCrossTrafficAlert
            carApplePlay
            carAndroidAuto
            carVoiceControl
            carBluetoothConnectivity
            carWirelessCharging
            carParkingAssist
            carSurroundViewCamera
            carFrontSensors
            carRearSensors
            carFrontRecordCamera
            carRearRecordCamera
            carHeadsUpDisplay
            carClimateControl
            carAdjustableSeats
            carMemorySeats
            carPowerTrain
            carRegenerativeBraking
            carTractionControl
            carStabilityControl
            carHillStartAssist
            carTirePressureSystem
            carPushButton
            carCrush
            carRepair
            carFrontBumper
            carBackBumper
            carBonnet
            carTailgate
            carRightFrontWing
            carLeftFrontWing
            carRightBackWing
            carLeftBackWing
            carRoof
            carRightFrontDoor
            carLeftFrontDoor
            carRightBackDoor
            carLeftBackDoor
            carViews
            carLikes
            carSave
            carComments
            carRank
            memberId
            soldAt
            deletedAt
            createdAt
            updatedAt
            meSaved {
                memberId
                saveRefId
                mySaved
            }
            meLiked {
                memberId
                likeRefId
                myFavorite
            }
            creatorData {
                _id
                type
                status
                authType
                titleNick
                fullName
                image
                images
                location
                address
                shortDesc
                longDesc
                phone
                phone2
                email
                kakaoTalk
                youtube
                instagram
                facebook
                tikTok
                naverBlog
                xcom
                followers
                followings
                likes
                views
                comments
                warnings
                articles
                blocks
                memberCars
                usedCars
                newCars
                rank
                points
                sellerProducts
                dealerBrand
                dealerFinancing
                dealerCarService
                dealerTradeIn
                dealerCustomization
                dealerWarranties
                dealerParts
                dealerAccessories
                dealerCarDetailing
                dealerCarWash
                dealerCarTestDrive
                dealerCarDelivery
                dealerPlusService
                carServiceType
                carOilChange
                carAlignment
                carTireChange
                carBrakeCheck
                carBatteryCheck
                carTireBalance
                carSuspension
                carAirCondition
                carTransmissionCheck
                carEngineDiagnostic
                carExhaust
                carDetailing
                carWindshield
                carTimingBelt
                carChainReplacement
                comfort
                performance
                exterior
                interior
                reliability
                fast
                openAt
                closeAt
                openSunday
                closeSunday
                openSaturday
                closeSaturday
                publicHolidays
                deletedAt
                createdAt
                updatedAt
                accessToken
                meFollowed {
                    followingId
                    followerId
                    myFollowing
                }
                meLiked {
                    memberId
                    likeRefId
                    myFavorite
                }
            }
        }
    }
}`;

// export const GET_AGENT_PROPERTIES = gql`
// 	query GetAgentProperties($input: AgentPropertiesInquiry!) {
// 		getAgentProperties(input: $input) {
// 			list {
// 				_id
// 				propertyType
// 				propertyStatus
// 				propertyLocation
// 				propertyAddress
// 				propertyTitle
// 				propertyPrice
// 				propertySquare
// 				propertyBeds
// 				propertyRooms
// 				propertyViews
// 				propertyLikes
// 				propertyImages
// 				propertyDesc
// 				propertyBarter
// 				propertyRent
// 				memberId
// 				soldAt
// 				deletedAt
// 				constructedAt
// 				createdAt
// 				updatedAt
// 			}
// 			metaCounter {
// 				total
// 			}
// 		}
// 	}
// `;

export const GET_LIKED = gql`
query GetLiked($input: OrdinaryInquiry!) {
    getLiked(input: $input) {
        metaCounter {
            total
        }
        list {
            _id
            carType
            carTitle
            carBody
            carStatus
            carSort
            carGroup
            carMadeIn
            carBrand
            carModel
            carPrice
            carImages
            carVideo
            carLocation
            carAddress
            carDesc
            carBarter
            carRent
            carYear
            carTuning
            carTuningType
            carMileage
            carFuelType
            carDriveType
            carTransmission
            carEngineSize
            carColor
            carFullFuel
            carMpgHw
            carMpgCity
            carDoor
            carCylinders
            carMaxSpeed
            carHundredSpeed
            carHorsePower
            carTorque
            carLength
            carHeigth
            carWidth
            carSeatsUp
            carWeigth
            carLoadWeight
            carTireSize
            carWheelBase
            carAutoBrake
            carCruiseControl
            carESC
            carAutonomuosDrive
            carExteriorLight
            carPanoramicSunroof
            carHeatedSeats
            carCooledSeats
            carTouchscreenDisplay
            carAutoHeadLight
            carStarStop
            carNoiseCancellation
            carRemoteKeyless
            carLaneDW
            carBlindSpotMonitoring
            carRearCrossTrafficAlert
            carApplePlay
            carAndroidAuto
            carVoiceControl
            carBluetoothConnectivity
            carWirelessCharging
            carParkingAssist
            carSurroundViewCamera
            carFrontSensors
            carRearSensors
            carFrontRecordCamera
            carRearRecordCamera
            carHeadsUpDisplay
            carClimateControl
            carAdjustableSeats
            carMemorySeats
            carPowerTrain
            carRegenerativeBraking
            carTractionControl
            carStabilityControl
            carHillStartAssist
            carTirePressureSystem
            carPushButton
            carCrush
            carRepair
            carFrontBumper
            carBackBumper
            carBonnet
            carTailgate
            carRightFrontWing
            carLeftFrontWing
            carRightBackWing
            carLeftBackWing
            carRoof
            carRightFrontDoor
            carLeftFrontDoor
            carRightBackDoor
            carLeftBackDoor
            carViews
            carLikes
            carSave
            carComments
            carRank
            memberId
            soldAt
            deletedAt
            createdAt
            updatedAt
            meSaved {
                memberId
                saveRefId
                mySaved
            }
            meLiked {
                memberId
                likeRefId
                myFavorite
            }
            creatorData {
                _id
                type
                status
                authType
                titleNick
                fullName
                image
                images
                location
                address
                shortDesc
                longDesc
                phone
                phone2
                email
                kakaoTalk
                youtube
                instagram
                facebook
                tikTok
                naverBlog
                xcom
                followers
                followings
                likes
                views
                comments
                warnings
                articles
                blocks
                memberCars
                usedCars
                newCars
                rank
                points
                sellerProducts
                dealerBrand
                dealerFinancing
                dealerCarService
                dealerTradeIn
                dealerCustomization
                dealerWarranties
                dealerParts
                dealerAccessories
                dealerCarDetailing
                dealerCarWash
                dealerCarTestDrive
                dealerCarDelivery
                dealerPlusService
                carServiceType
                carOilChange
                carAlignment
                carTireChange
                carBrakeCheck
                carBatteryCheck
                carTireBalance
                carSuspension
                carAirCondition
                carTransmissionCheck
                carEngineDiagnostic
                carExhaust
                carDetailing
                carWindshield
                carTimingBelt
                carChainReplacement
                comfort
                performance
                exterior
                interior
                reliability
                fast
                openAt
                closeAt
                openSunday
                closeSunday
                openSaturday
                closeSaturday
                publicHolidays
                deletedAt
                createdAt
                updatedAt
                accessToken
                meFollowed {
                    followingId
                    followerId
                    myFollowing
                }
                meLiked {
                    memberId
                    likeRefId
                    myFavorite
                }
            }
        }
    }
}`;

export const GET_SAVED = gql`
query GetSaved($input: OrdinaryInquiry!) {
    getSaved(input: $input) {
        metaCounter {
            total
        }
        list {
            _id
            carType
            carTitle
            carBody
            carStatus
            carSort
            carGroup
            carMadeIn
            carBrand
            carModel
            carPrice
            carImages
            carVideo
            carLocation
            carAddress
            carDesc
            carBarter
            carRent
            carYear
            carTuning
            carTuningType
            carMileage
            carFuelType
            carDriveType
            carTransmission
            carEngineSize
            carColor
            carFullFuel
            carMpgHw
            carMpgCity
            carDoor
            carCylinders
            carMaxSpeed
            carHundredSpeed
            carHorsePower
            carTorque
            carLength
            carHeigth
            carWidth
            carSeatsUp
            carWeigth
            carLoadWeight
            carTireSize
            carWheelBase
            carAutoBrake
            carCruiseControl
            carESC
            carAutonomuosDrive
            carExteriorLight
            carPanoramicSunroof
            carHeatedSeats
            carCooledSeats
            carTouchscreenDisplay
            carAutoHeadLight
            carStarStop
            carNoiseCancellation
            carRemoteKeyless
            carLaneDW
            carBlindSpotMonitoring
            carRearCrossTrafficAlert
            carApplePlay
            carAndroidAuto
            carVoiceControl
            carBluetoothConnectivity
            carWirelessCharging
            carParkingAssist
            carSurroundViewCamera
            carFrontSensors
            carRearSensors
            carFrontRecordCamera
            carRearRecordCamera
            carHeadsUpDisplay
            carClimateControl
            carAdjustableSeats
            carMemorySeats
            carPowerTrain
            carRegenerativeBraking
            carTractionControl
            carStabilityControl
            carHillStartAssist
            carTirePressureSystem
            carPushButton
            carCrush
            carRepair
            carFrontBumper
            carBackBumper
            carBonnet
            carTailgate
            carRightFrontWing
            carLeftFrontWing
            carRightBackWing
            carLeftBackWing
            carRoof
            carRightFrontDoor
            carLeftFrontDoor
            carRightBackDoor
            carLeftBackDoor
            carViews
            carLikes
            carSave
            carComments
            carRank
            memberId
            soldAt
            deletedAt
            createdAt
            updatedAt
            meSaved {
                memberId
                saveRefId
                mySaved
            }
            meLiked {
                memberId
                likeRefId
                myFavorite
            }
            creatorData {
                _id
                type
                status
                authType
                titleNick
                fullName
                image
                images
                location
                address
                shortDesc
                longDesc
                phone
                phone2
                email
                kakaoTalk
                youtube
                instagram
                facebook
                tikTok
                naverBlog
                xcom
                followers
                followings
                likes
                views
                comments
                warnings
                articles
                blocks
                memberCars
                usedCars
                newCars
                rank
                points
                sellerProducts
                dealerBrand
                dealerFinancing
                dealerCarService
                dealerTradeIn
                dealerCustomization
                dealerWarranties
                dealerParts
                dealerAccessories
                dealerCarDetailing
                dealerCarWash
                dealerCarTestDrive
                dealerCarDelivery
                dealerPlusService
                carServiceType
                carOilChange
                carAlignment
                carTireChange
                carBrakeCheck
                carBatteryCheck
                carTireBalance
                carSuspension
                carAirCondition
                carTransmissionCheck
                carEngineDiagnostic
                carExhaust
                carDetailing
                carWindshield
                carTimingBelt
                carChainReplacement
                comfort
                performance
                exterior
                interior
                reliability
                fast
                openAt
                closeAt
                openSunday
                closeSunday
                openSaturday
                closeSaturday
                publicHolidays
                deletedAt
                createdAt
                updatedAt
                accessToken
                meFollowed {
                    followingId
                    followerId
                    myFollowing
                }
                meLiked {
                    memberId
                    likeRefId
                    myFavorite
                }
            }
        }
    }
}`;

// export const GET_FAVORITES = gql`
// 	query GetFavorites($input: OrdinaryInquiry!) {
// 		getFavorites(input: $input) {
// 			list {
// 				_id
// 				propertyType
// 				propertyStatus
// 				propertyLocation
// 				propertyAddress
// 				propertyTitle
// 				propertyPrice
// 				propertySquare
// 				propertyBeds
// 				propertyRooms
// 				propertyViews
// 				propertyLikes
// 				propertyComments
// 				propertyRank
// 				propertyImages
// 				propertyDesc
// 				propertyBarter
// 				propertyRent
// 				memberId
// 				soldAt
// 				deletedAt
// 				constructedAt
// 				createdAt
// 				updatedAt
// 				memberData {
// 					_id
// 					memberType
// 					memberStatus
// 					memberAuthType
// 					memberPhone
// 					memberNick
// 					memberFullName
// 					memberImage
// 					memberAddress
// 					memberDesc
// 					memberProperties
// 					memberArticles
// 					memberPoints
// 					memberLikes
// 					memberViews
// 					memberComments
// 					memberFollowings
// 					memberFollowers
// 					memberRank
// 					memberWarnings
// 					memberBlocks
// 					deletedAt
// 					createdAt
// 					updatedAt
// 					accessToken
// 				}
// 			}
// 			metaCounter {
// 				total
// 			}
// 		}
// 	}
// `;

export const GET_VISITED = gql`
query GetVisited($input: OrdinaryInquiry!) {
    getVisited(input: $input) {
        metaCounter {
            total
        }
        list {
            _id
            carType
            carTitle
            carBody
            carStatus
            carSort
            carGroup
            carMadeIn
            carBrand
            carModel
            carPrice
            carImages
            carVideo
            carLocation
            carAddress
            carDesc
            carBarter
            carRent
            carYear
            carTuning
            carTuningType
            carMileage
            carFuelType
            carDriveType
            carTransmission
            carEngineSize
            carColor
            carFullFuel
            carMpgHw
            carMpgCity
            carDoor
            carCylinders
            carMaxSpeed
            carHundredSpeed
            carHorsePower
            carTorque
            carLength
            carHeigth
            carWidth
            carSeatsUp
            carWeigth
            carLoadWeight
            carTireSize
            carWheelBase
            carAutoBrake
            carCruiseControl
            carESC
            carAutonomuosDrive
            carExteriorLight
            carPanoramicSunroof
            carHeatedSeats
            carCooledSeats
            carTouchscreenDisplay
            carAutoHeadLight
            carStarStop
            carNoiseCancellation
            carRemoteKeyless
            carLaneDW
            carBlindSpotMonitoring
            carRearCrossTrafficAlert
            carApplePlay
            carAndroidAuto
            carVoiceControl
            carBluetoothConnectivity
            carWirelessCharging
            carParkingAssist
            carSurroundViewCamera
            carFrontSensors
            carRearSensors
            carFrontRecordCamera
            carRearRecordCamera
            carHeadsUpDisplay
            carClimateControl
            carAdjustableSeats
            carMemorySeats
            carPowerTrain
            carRegenerativeBraking
            carTractionControl
            carStabilityControl
            carHillStartAssist
            carTirePressureSystem
            carPushButton
            carCrush
            carRepair
            carFrontBumper
            carBackBumper
            carBonnet
            carTailgate
            carRightFrontWing
            carLeftFrontWing
            carRightBackWing
            carLeftBackWing
            carRoof
            carRightFrontDoor
            carLeftFrontDoor
            carRightBackDoor
            carLeftBackDoor
            carViews
            carLikes
            carSave
            carComments
            carRank
            memberId
            soldAt
            deletedAt
            createdAt
            updatedAt
            meSaved {
                memberId
                saveRefId
                mySaved
            }
            meLiked {
                memberId
                likeRefId
                myFavorite
            }
            creatorData {
                _id
                type
                status
                authType
                titleNick
                fullName
                image
                images
                location
                address
                shortDesc
                longDesc
                phone
                phone2
                email
                kakaoTalk
                youtube
                instagram
                facebook
                tikTok
                naverBlog
                xcom
                followers
                followings
                likes
                views
                comments
                warnings
                articles
                blocks
                memberCars
                usedCars
                newCars
                rank
                points
                sellerProducts
                dealerBrand
                dealerFinancing
                dealerCarService
                dealerTradeIn
                dealerCustomization
                dealerWarranties
                dealerParts
                dealerAccessories
                dealerCarDetailing
                dealerCarWash
                dealerCarTestDrive
                dealerCarDelivery
                dealerPlusService
                carServiceType
                carOilChange
                carAlignment
                carTireChange
                carBrakeCheck
                carBatteryCheck
                carTireBalance
                carSuspension
                carAirCondition
                carTransmissionCheck
                carEngineDiagnostic
                carExhaust
                carDetailing
                carWindshield
                carTimingBelt
                carChainReplacement
                comfort
                performance
                exterior
                interior
                reliability
                fast
                openAt
                closeAt
                openSunday
                closeSunday
                openSaturday
                closeSaturday
                publicHolidays
                deletedAt
                createdAt
                updatedAt
                accessToken
            }
        }
    }
}`;

// export const GET_VISITED = gql`
// 	query GetVisited($input: OrdinaryInquiry!) {
// 		getVisited(input: $input) {
// 			list {
// 				_id
// 				propertyType
// 				propertyStatus
// 				propertyLocation
// 				propertyAddress
// 				propertyTitle
// 				propertyPrice
// 				propertySquare
// 				propertyBeds
// 				propertyRooms
// 				propertyViews
// 				propertyLikes
// 				propertyComments
// 				propertyRank
// 				propertyImages
// 				propertyDesc
// 				propertyBarter
// 				propertyRent
// 				memberId
// 				soldAt
// 				deletedAt
// 				constructedAt
// 				createdAt
// 				updatedAt
// 				memberData {
// 					_id
// 					memberType
// 					memberStatus
// 					memberAuthType
// 					memberPhone
// 					memberNick
// 					memberFullName
// 					memberImage
// 					memberAddress
// 					memberDesc
// 					memberProperties
// 					memberArticles
// 					memberPoints
// 					memberLikes
// 					memberViews
// 					memberComments
// 					memberFollowings
// 					memberFollowers
// 					memberRank
// 					memberWarnings
// 					memberBlocks
// 					deletedAt
// 					createdAt
// 					updatedAt
// 					accessToken
// 				}
// 			}
// 			metaCounter {
// 				total
// 			}
// 		}
// 	}
// `;

/**************************
 *      BOARD-ARTICLE     *
 *************************/

export const GET_BOARD_ARTICLE = gql`
	query GetBoardArticle($input: String!) {
		getBoardArticle(articleId: $input) {
			_id
			articleCategory
			articleStatus
			articleTitle
			articleContent
			articleImage
			articleViews
			articleLikes
			articleComments
			memberId
			createdAt
			updatedAt
			memberData {
				_id
				memberType
				memberStatus
				memberAuthType
				memberPhone
				memberNick
				memberFullName
				memberImage
				memberAddress
				memberDesc
				memberWarnings
				memberBlocks
				memberProperties
				memberRank
				memberPoints
				memberLikes
				memberViews
				deletedAt
				createdAt
				updatedAt
			}
			meLiked {
				memberId
				likeRefId
				myFavorite
			}
		}
	}
`;

export const GET_ARTICLES = gql`
query GetArticles($input: ArticlesInquiry!) {
    getArticles(input: $input) {
        metaCounter {
            total
        }
        list {
            _id
            articleCategory
            articleStatus
            articleTitle
            articleContent
            articleImage
            articleViews
            articleLikes
            articleComments
            memberId
            createdAt
            updatedAt
            meLiked {
                memberId
                likeRefId
                myFavorite
            }
            creatorData {
                _id
                type
                status
                authType
                titleNick
                fullName
                image
                images
                location
                address
                shortDesc
                longDesc
                phone
                phone2
                email
                kakaoTalk
                youtube
                instagram
                facebook
                tikTok
                naverBlog
                xcom
                followers
                followings
                likes
                views
                comments
                warnings
                articles
                blocks
                memberCars
                usedCars
                newCars
                rank
                points
                sellerProducts
                dealerBrand
                dealerFinancing
                dealerCarService
                dealerTradeIn
                dealerCustomization
                dealerWarranties
                dealerParts
                dealerAccessories
                dealerCarDetailing
                dealerCarWash
                dealerCarTestDrive
                dealerCarDelivery
                dealerPlusService
                carServiceType
                carOilChange
                carAlignment
                carTireChange
                carBrakeCheck
                carBatteryCheck
                carTireBalance
                carSuspension
                carAirCondition
                carTransmissionCheck
                carEngineDiagnostic
                carExhaust
                carDetailing
                carWindshield
                carTimingBelt
                carChainReplacement
                comfort
                performance
                exterior
                interior
                reliability
                fast
                openAt
                closeAt
                openSunday
                closeSunday
                openSaturday
                closeSaturday
                publicHolidays
                deletedAt
                createdAt
                updatedAt
                accessToken
                meFollowed {
                    followingId
                    followerId
                    myFollowing
                }
                meLiked {
                    memberId
                    likeRefId
                    myFavorite
                }
            }
        }
    }
}`

// export const GET_BOARD_ARTICLES = gql`
// 	query GetBoardArticles($input: BoardArticlesInquiry!) {
// 		getBoardArticles(input: $input) {
// 			list {
// 				_id
// 				articleCategory
// 				articleStatus
// 				articleTitle
// 				articleContent
// 				articleImage
// 				articleViews
// 				articleLikes
// 				articleComments
// 				memberId
// 				createdAt
// 				updatedAt
// 				meLiked {
// 					memberId
// 					likeRefId
// 					myFavorite
// 				}
// 				memberData {
// 					_id
// 					memberType
// 					memberStatus
// 					memberAuthType
// 					memberPhone
// 					memberNick
// 					memberFullName
// 					memberImage
// 					memberAddress
// 					memberDesc
// 					memberWarnings
// 					memberBlocks
// 					memberProperties
// 					memberRank
// 					memberPoints
// 					memberLikes
// 					memberViews
// 					deletedAt
// 					createdAt
// 					updatedAt
// 				}
// 			}
// 			metaCounter {
// 				total
// 			}
// 		}
// 	}
// `;

/**************************
 *         COMMENT        *
 *************************/

export const GET_COMMENTS = gql`
	query GetComments($input: CommentsInquiry!) {
		getComments(input: $input) {
			list {
				_id
				commentStatus
				commentGroup
				commentContent
				commentRefId
				memberId
				createdAt
				updatedAt
				memberData {
					_id
					memberType
					memberStatus
					memberAuthType
					memberPhone
					memberNick
					memberFullName
					memberImage
					memberAddress
					memberDesc
					memberWarnings
					memberBlocks
					memberProperties
					memberRank
					memberPoints
					memberLikes
					memberViews
					deletedAt
					createdAt
					updatedAt
					accessToken
				}
			}
			metaCounter {
				total
			}
		}
	}
`;

/**************************
 *         FOLLOW        *
 *************************/

export const GET_FOLLOWERS = gql`
query GetMemberFollowers($input: FollowInquiry!) {
    getMemberFollowers(input: $input) {
        metaCounter {
            total
        }
        list {
            _id
            followingId
            followerId
            createdAt
            updatedAt
            followerData {
                _id
                type
                status
                authType
                titleNick
                fullName
                image
                images
                location
                address
                shortDesc
                longDesc
                phone
                phone2
                email
                kakaoTalk
                youtube
                instagram
                facebook
                tikTok
                naverBlog
                xcom
                followers
                followings
                likes
                views
                comments
                warnings
                articles
                blocks
                memberCars
                usedCars
                newCars
                rank
                points
                sellerProducts
                dealerBrand
                dealerFinancing
                dealerCarService
                dealerTradeIn
                dealerCustomization
                dealerWarranties
                dealerParts
                dealerAccessories
                dealerCarDetailing
                dealerCarWash
                dealerCarTestDrive
                dealerCarDelivery
                dealerPlusService
                carServiceType
                carOilChange
                carAlignment
                carTireChange
                carBrakeCheck
                carBatteryCheck
                carTireBalance
                carSuspension
                carAirCondition
                carTransmissionCheck
                carEngineDiagnostic
                carExhaust
                carDetailing
                carWindshield
                carTimingBelt
                carChainReplacement
                comfort
                performance
                exterior
                interior
                reliability
                fast
                openAt
                closeAt
                openSunday
                closeSunday
                openSaturday
                closeSaturday
                publicHolidays
                deletedAt
                createdAt
                updatedAt
                accessToken
                meFollowed {
                    followingId
                    followerId
                    myFollowing
                }
                meLiked {
                    memberId
                    likeRefId
                    myFavorite
                }
            }
            meFollowed {
                followingId
                followerId
                myFollowing
            }
            meLiked {
                memberId
                likeRefId
                myFavorite
            }
        }
    }
}`;

// export const GET_MEMBER_FOLLOWERS = gql`
// 	query GetMemberFollowers($input: FollowInquiry!) {
// 		getMemberFollowers(input: $input) {
// 			list {
// 				_id
// 				followingId
// 				followerId
// 				createdAt
// 				updatedAt
// 				meLiked {
// 					memberId
// 					likeRefId
// 					myFavorite
// 				}
// 				meFollowed {
// 					followingId
// 					followerId
// 					myFollowing
// 				}
// 				followerData {
// 					_id
// 					memberType
// 					memberStatus
// 					memberAuthType
// 					memberPhone
// 					memberNick
// 					memberFullName
// 					memberImage
// 					memberAddress
// 					memberDesc
// 					memberProperties
// 					memberArticles
// 					memberPoints
// 					memberLikes
// 					memberViews
// 					memberComments
// 					memberFollowings
// 					memberFollowers
// 					memberRank
// 					memberWarnings
// 					memberBlocks
// 					deletedAt
// 					createdAt
// 					updatedAt
// 				}
// 			}
// 			metaCounter {
// 				total
// 			}
// 		}
// 	}
// `;

export const GET_FOLLOWINGS = gql`
query GetMemberFollowings($input: FollowInquiry!) {
    getMemberFollowings(input: $input) {
        metaCounter {
            total
        }
        list {
            _id
            followingId
            followerId
            createdAt
            updatedAt
            followingData {
                _id
                type
                status
                authType
                titleNick
                fullName
                image
                images
                location
                address
                shortDesc
                longDesc
                phone
                phone2
                email
                kakaoTalk
                youtube
                instagram
                facebook
                tikTok
                naverBlog
                xcom
                followers
                followings
                likes
                views
                comments
                warnings
                articles
                blocks
                memberCars
                usedCars
                newCars
                rank
                points
                sellerProducts
                dealerBrand
                dealerFinancing
                dealerCarService
                dealerTradeIn
                dealerCustomization
                dealerWarranties
                dealerParts
                dealerAccessories
                dealerCarDetailing
                dealerCarWash
                dealerCarTestDrive
                dealerCarDelivery
                dealerPlusService
                carServiceType
                carOilChange
                carAlignment
                carTireChange
                carBrakeCheck
                carBatteryCheck
                carTireBalance
                carSuspension
                carAirCondition
                carTransmissionCheck
                carEngineDiagnostic
                carExhaust
                carDetailing
                carWindshield
                carTimingBelt
                carChainReplacement
                comfort
                performance
                exterior
                interior
                reliability
                fast
                openAt
                closeAt
                openSunday
                closeSunday
                openSaturday
                closeSaturday
                publicHolidays
                deletedAt
                createdAt
                updatedAt
                accessToken
                meFollowed {
                    followingId
                    followerId
                    myFollowing
                }
                meLiked {
                    memberId
                    likeRefId
                    myFavorite
                }
            }
            meFollowed {
                followingId
                followerId
                myFollowing
            }
            meLiked {
                memberId
                likeRefId
                myFavorite
            }
        }
    }
}`;

// export const GET_MEMBER_FOLLOWINGS = gql`
// 	query GetMemberFollowings($input: FollowInquiry!) {
// 		getMemberFollowings(input: $input) {
// 			list {
// 				_id
// 				followingId
// 				followerId
// 				createdAt
// 				updatedAt
// 				followingData {
// 					_id
// 					memberType
// 					memberStatus
// 					memberAuthType
// 					memberPhone
// 					memberNick
// 					memberFullName
// 					memberImage
// 					memberAddress
// 					memberDesc
// 					memberProperties
// 					memberArticles
// 					memberPoints
// 					memberLikes
// 					memberViews
// 					memberComments
// 					memberFollowings
// 					memberFollowers
// 					memberRank
// 					memberWarnings
// 					memberBlocks
// 					deletedAt
// 					createdAt
// 					updatedAt
// 					accessToken
// 				}
// 				meLiked {
// 					memberId
// 					likeRefId
// 					myFavorite
// 				}
// 				meFollowed {
// 					followingId
// 					followerId
// 					myFollowing
// 				}
// 			}
// 			metaCounter {
// 				total
// 			}
// 		}
// 	}
// `;
