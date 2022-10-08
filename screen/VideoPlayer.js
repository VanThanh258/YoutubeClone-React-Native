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
import {
    showLike,
    showView,
    renderTextWithBreakLines,
    showTime,
    showSubscribe,
    showComment,
} from '../utils/video';

const screenHeight = Dimensions.get('window').height;
const bottomSheetHeight = screenHeight - screenHeight / 3.5;

const VideoPlayer = () => {
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
