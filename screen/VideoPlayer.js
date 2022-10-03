import { View, Text, ScrollView, Dimensions, BackHandler } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WatchVideo from '../components/WatchVideo';
import InfoVideo from '../components/InfoVideo';
import { useRef } from 'react';
import OptionBar from '../components/OptionBar';
import Channel from '../components/Channel';
import Comment from '../components/Comment';
import { useEffect } from 'react';
import { fetchRelatedVideo } from '../src/store/relatedVideoSilce';
import { videoSliceAction } from '../src/store/videoSlice';
import { channelSliceAction } from '../src/store/channelSlice';
import VideoCard from '../components/VideoCard';
import BottomSheetDetail from '../components/BottomSheetDetail';
import { fetchComment } from '../src/store/commentSlice';
import BottomSheetComment from '../components/BottomSheetComment';

const screenHeight = Dimensions.get('window').height;
const bottomSheetHeight = screenHeight - screenHeight / 3.5;

const VideoPlayer = ({ navigation }) => {
    const dispatch = useDispatch();
    const videoId = useSelector((state) => state.video.videoId);
    const listVideo = useSelector((state) => state.video.listVideo);
    const channelId = useSelector((state) => state.channel.channelId);
    const listChannel = useSelector((state) => state.channel.listChannel);
    const listRelatedVideo = useSelector(
        (state) => state.relatedVideo.listRelatedVideo,
    );
    const listComment = useSelector((state) => state.comment.listComment);
    const video = listVideo.find((item) => item.id === videoId);
    const channel = listChannel.find((item) => item.id === channelId);
    const viewVideo = video.statistics.viewCount
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const dateVideo = new Date(video.snippet.publishedAt);
    const day = dateVideo.getDate();
    const month = dateVideo.getMonth() + 1;
    const year = dateVideo.getFullYear();

    const refInfo = useRef(null);
    const refComment = useRef(null);

    useEffect(() => {
        dispatch(fetchRelatedVideo(videoId));
    }, [videoId]);

    useEffect(() => {
        dispatch(fetchComment(videoId));
    }, [videoId]);

    const renderTextWithBreakLines = (text) => {
        return text?.split(`\n`).map((txt, i) => (
            <Text key={i}>
                {txt}
                {'\n'}
            </Text>
        ));
    };

    const showTime = (date) => {
        let timeString;
        let datePublicVideo = new Date(date);
        let dateNow = new Date();
        let time = dateNow - datePublicVideo;
        if (time > 31104000000) {
            timeString =
                Math.floor(time / 1000 / 60 / 60 / 24 / 30 / 12) + ' năm trước';
        } else if (time > 2592000000) {
            timeString =
                Math.floor(time / 1000 / 60 / 60 / 24 / 30) + ' tháng trước';
        } else if (time > 86400000) {
            timeString = Math.floor(time / 1000 / 60 / 60 / 24) + ' ngày trước';
        } else if (time > 3600000) {
            timeString = Math.floor(time / 1000 / 60 / 60) + ' giờ trước';
        } else if (time > 60000) {
            timeString = ' vài phút trước';
        }
        return timeString;
    };

    const showView = (view) => {
        let viewString;
        if (view > 1000000) {
            viewString = (view / 1000000).toFixed(1) + ' Tr' + ' lượt xem';
        } else if (view > 1000) {
            viewString = (view / 1000).toFixed(0) + ' N' + ' lượt xem';
        }
        return viewString;
    };

    const showLike = (like) => {
        let likeString;
        if (like > 1000000) {
            likeString = (like / 1000000).toFixed(0) + ' Tr';
        } else if (like > 10000) {
            likeString = (like / 10000).toFixed(0) + ' N';
        } else if (like > 1000) {
            likeString = (like / 1000).toFixed(1) + ' N';
        }
        return likeString;
    };

    const showSubscribe = (sub) => {
        let subString;
        if (sub > 10000000) {
            subString = (sub / 1000000).toFixed(1) + ' Tr subscribe';
        } else if (sub > 1000000) {
            subString = (sub / 1000000).toFixed(2) + ' Tr subscribe';
        } else if (sub > 1000) {
            subString = (sub / 1000).toFixed(0) + ' N subscribe';
        }
        return subString;
    };

    const showComment = (comment) => {
        let commentString;
        if (comment > 1000000) {
            commentString = (comment / 1000000).toFixed(1) + ' Tr';
        } else if (comment > 1000) {
            commentString = (comment / 1000).toFixed(0) + ' N';
        } else {
            commentString = comment;
        }
        return commentString;
    };

    const viewString = showView(video.statistics.viewCount);
    const timeString = showTime(video.snippet.publishedAt);
    const likeString = showLike(video.statistics.likeCount);
    const commentString = showComment(video.statistics.commentCount);
    const subString = showSubscribe(channel.statistics.subscriberCount);
    const descVideo = renderTextWithBreakLines(video.snippet.description);

    const backActionInfo = () => {
        refInfo?.current?.scrollTo(0);
        BackHandler.removeEventListener('hardwareBackPress', backActionInfo);
        return true;
    };

    const backActionComment = () => {
        refComment?.current?.scrollTo(0);
        BackHandler.removeEventListener('hardwareBackPress', backActionComment);
        return true;
    };

    const handleSeeMoreInfo = () => {
        refInfo?.current?.scrollTo(-bottomSheetHeight);
        BackHandler.addEventListener('hardwareBackPress', backActionInfo);
    };

    const handleSeeComment = () => {
        refComment?.current?.scrollTo(-bottomSheetHeight);
        BackHandler.addEventListener('hardwareBackPress', backActionComment);
    };

    const handleNavigation = (item) => {
        const actionUpdateVideoId = videoSliceAction.updateVideoId(item.id);
        dispatch(actionUpdateVideoId);
        const actionUpdateChannelId = channelSliceAction.updateChannelId(
            item.snippet.channelId,
        );
        dispatch(actionUpdateChannelId);
    };

    return (
        <View>
            <WatchVideo videoId={videoId} />
            <View style={{ height: '72%' }}>
                <ScrollView>
                    <InfoVideo
                        onMoreInfomation={handleSeeMoreInfo}
                        title={video.snippet.title}
                        view={viewString}
                        time={timeString}
                    />
                    <OptionBar like={likeString} />
                    <Channel
                        avatar={channel.snippet.thumbnails.high.url}
                        title={channel.snippet.localized.title}
                        subscribe={subString}
                    />
                    <Comment
                        commentCount={commentString}
                        avatar={
                            listComment[0]?.snippet.topLevelComment.snippet
                                .authorProfileImageUrl
                        }
                        commentPublic={
                            listComment[0]?.snippet.topLevelComment.snippet
                                .textOriginal
                        }
                        onMoreComment={handleSeeComment}
                    />
                    {listRelatedVideo &&
                        listRelatedVideo.map((item) => {
                            return (
                                <VideoCard
                                    onNavigation={handleNavigation}
                                    key={item.id.videoId}
                                    channelId={item.snippet.channelId}
                                    videoId={item.id.videoId}
                                />
                            );
                        })}
                </ScrollView>
            </View>
            <BottomSheetDetail
                ref={refInfo}
                title={video?.snippet.title}
                avatar={channel.snippet.thumbnails.high.url}
                nameChannel={channel.snippet.localized.title}
                likeVideo={likeString}
                view={viewVideo}
                desc={descVideo}
                day={day}
                month={month}
                year={year}
            />
            <BottomSheetComment ref={refComment} />
        </View>
    );
};

export default VideoPlayer;
