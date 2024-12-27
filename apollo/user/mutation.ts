import { gql } from '@apollo/client';

/**************************
 *         MEMBER         *
 *************************/

export const SIGN_UP = gql`
mutation Signup($input: MemberInput!) {
    signup(input: $input) {
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
}`;

// export const SIGN_UP = gql`
// 	mutation Signup($input: MemberInput!) {
// 		signup(input: $input) {
// 			_id
// 			memberType
// 			memberStatus
// 			memberAuthType
// 			memberPhone
// 			memberNick
// 			memberFullName
// 			memberImage
// 			memberAddress
// 			memberDesc
// 			memberWarnings
// 			memberBlocks
// 			memberProperties
// 			memberRank
// 			memberArticles
// 			memberPoints
// 			memberLikes
// 			memberViews
// 			deletedAt
// 			createdAt
// 			updatedAt
// 			accessToken
// 		}
// 	}
// `;

export const LOGIN = gql`
	mutation Login($input: LoginInput!) {
		login(input: $input) {
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
`;

export const UPDATE_MEMBER = gql`
mutation UpdateMember($input: MemberUpdate!) {
    updateMember(input: $input) {
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
}`;

// export const UPDATE_MEMBER = gql`
// 	mutation UpdateMember($input: MemberUpdate!) {
// 		updateMember(input: $input) {
// 			_id
// 			memberType
// 			memberStatus
// 			memberAuthType
// 			memberPhone
// 			memberNick
// 			memberFullName
// 			memberImage
// 			memberAddress
// 			memberDesc
// 			memberProperties
// 			memberRank
// 			memberArticles
// 			memberPoints
// 			memberLikes
// 			memberViews
// 			memberWarnings
// 			memberBlocks
// 			deletedAt
// 			createdAt
// 			updatedAt
// 			accessToken
// 		}
// 	}
// `;

export const LIKE_TARGET_MEMBER = gql`
	mutation LikeTargetMember($input: String!) {
		likeTargetMember(memberId: $input) {
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
`;

/**************************
 *        PROduct         *
 *************************/

export const CREATE_PRODUCT = gql`
mutation CreateProduct($input: ProductInput!) {
    createProduct(input: $input) {
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
    }
}`;

export const UPDATE_PRODUCT = gql`
mutation UpdateProduct($input: ProductUpdate!) {
    updateProduct(input: $input) {
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
    }
}`;

/**************************
 *        PROPERTY        *
 *************************/

export const CREATE_CAR = gql`
mutation CreateCar($input: CarInput!) {
    createCar(input: $input) {
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
    }
}`;

// export const CREATE_PROPERTY = gql`
// 	mutation CreateProperty($input: PropertyInput!) {
// 		createProperty(input: $input) {
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
// 		}
// 	}
// `;

export const UPDATE_CAR = gql`
mutation UpdateCar($input: CarUpdate!) {
    updateCar(input: $input) {
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
    }
}
`

// export const UPDATE_PROPERTY = gql`
// 	mutation UpdateProperty($input: PropertyUpdate!) {
// 		updateProperty(input: $input) {
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
// 		}
// 	}
// `;

export const LIKE_CAR = gql`
mutation LikeTargetCar($input: String!) {
    likeTargetCar(carId: $input) {
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
    }
}`;

// export const LIKE_TARGET_PROPERTY = gql`
// 	mutation LikeTargetProperty($input: String!) {
// 		likeTargetProperty(propertyId: $input) {
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
// 		}
// 	}
// `;

/**************************
 *      BOARD-ARTICLE     *
 *************************/

export const CREATE_ARTICLE = gql`
mutation CreateArticle($input: ArticleInput!) {
    createArticle(input: $input) {
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
    }
}`;

// export const CREATE_BOARD_ARTICLE = gql`
// 	mutation CreateBoardArticle($input: BoardArticleInput!) {
// 		createBoardArticle(input: $input) {
// 			_id
// 			articleCategory
// 			articleStatus
// 			articleTitle
// 			articleContent
// 			articleImage
// 			articleViews
// 			articleLikes
// 			memberId
// 			createdAt
// 			updatedAt
// 		}
// 	}
// `;

export const UPDATE_BOARD_ARTICLE = gql`
	mutation UpdateBoardArticle($input: BoardArticleUpdate!) {
		updateBoardArticle(input: $input) {
			_id
			articleCategory
			articleStatus
			articleTitle
			articleContent
			articleImage
			articleViews
			articleLikes
			memberId
			createdAt
			updatedAt
		}
	}
`;

export const LIKE_ARTICLE = gql`
mutation LikeTargetArticle($input: String!) {
    likeTargetArticle(articleId: $input) {
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
    }
}`;

// export const LIKE_TARGET_BOARD_ARTICLE = gql`
// 	mutation LikeTargetBoardArticle($input: String!) {
// 		likeTargetBoardArticle(articleId: $input) {
// 			_id
// 			articleCategory
// 			articleStatus
// 			articleTitle
// 			articleContent
// 			articleImage
// 			articleViews
// 			articleLikes
// 			memberId
// 			createdAt
// 			updatedAt
// 		}
// 	}
// `;

/**************************
 *         COMMENT        *
 *************************/

export const CREATE_COMMENT = gql`
	mutation CreateComment($input: CommentInput!) {
		createComment(input: $input) {
			_id
			commentStatus
			commentGroup
			commentContent
			commentRefId
			memberId
			createdAt
			updatedAt
		}
	}
`;

export const UPDATE_COMMENT = gql`
	mutation UpdateComment($input: CommentUpdate!) {
		updateComment(input: $input) {
			_id
			commentStatus
			commentGroup
			commentContent
			commentRefId
			memberId
			createdAt
			updatedAt
		}
	}
`;

/**************************
 *         FOLLOW        *
 *************************/

export const SUBSCRIBE = gql`
	mutation Subscribe($input: String!) {
		subscribe(input: $input) {
			_id
			followingId
			followerId
			createdAt
			updatedAt
		}
	}
`;

export const UNSUBSCRIBE = gql`
	mutation Unsubscribe($input: String!) {
		unsubscribe(input: $input) {
			_id
			followingId
			followerId
			createdAt
			updatedAt
		}
	}
`;
