import { Text } from 'react-native';

export const renderTextWithBreakLines = (text) => {
    return text?.split(`\n`).map((txt, i) => (
        <Text key={i}>
            {txt}
            {'\n'}
        </Text>
    ));
};

export const showTime = (date) => {
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

export const showView = (view) => {
    let viewString;
    if (view > 1000000) {
        viewString = (view / 1000000).toFixed(1) + ' Tr' + ' lượt xem';
    } else if (view > 1000) {
        viewString = (view / 1000).toFixed(0) + ' N' + ' lượt xem';
    }
    return viewString;
};

export const showLike = (like) => {
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

export const showSubscribe = (sub) => {
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

export const showComment = (comment) => {
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

export const YTDurationToSeconds = (duration) => {
    if (duration === 'P0D') {
        duration = 'PT0S';
    } else if (duration === 'P2DT8H46M15S') {
        duration = 'PT2D8H46M15S';
    } else if (duration === 'P1DT5H37M5S') {
        duration = 'PT1D5H37M5S';
    }
    let match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    match = match.slice(1).map(function (x) {
        if (x != null) {
            return x.replace(/\D/, '');
        }
    });

    let hours = parseInt(match[0]) || 0;
    let minutes = parseInt(match[1]) || 0;
    let seconds = parseInt(match[2]) || 0;

    return hours * 3600 + minutes * 60 + seconds;
};

export const showTimeVideo = (time) => {
    let hours;
    let minutes;
    let seconds;
    let timeVideo;
    if (time > 3600) {
        hours = Math.floor(time / 3600);
        minutes = Math.floor((time % 3600) / 60);
        seconds = Math.floor((time % 3600) % 60);
        if (minutes < 10 && seconds > 10) {
            timeVideo = `${hours}:0${minutes}:${seconds}`;
        } else if (minutes > 10 && seconds < 10) {
            timeVideo = `${hours}:${minutes}:0${seconds}`;
        } else if (minutes < 10 && seconds < 10) {
            timeVideo = `${hours}:0${minutes}:0${seconds}`;
        } else {
            timeVideo = `${hours}:${minutes}:${seconds}`;
        }
    } else if (time > 60) {
        minutes = Math.floor((time % 3600) / 60);
        seconds = Math.floor((time % 3600) % 60);
        if (seconds > 10) {
            timeVideo = `${minutes}:${seconds}`;
        } else {
            timeVideo = `${minutes}:0${seconds}`;
        }
    } else {
        seconds = Math.floor((time % 3600) % 60);
        timeVideo = `0:${seconds}`;
    }
    return timeVideo;
};

export const showDate = (date) => {
    let dateVideo;
    let datePublicVideo = new Date(date);
    let dateNow = new Date();
    let time = dateNow - datePublicVideo;
    if (time > 31104000000) {
        dateVideo =
            Math.floor(time / 1000 / 60 / 60 / 24 / 30 / 12) + ' năm trước';
    } else if (time > 2592000000) {
        dateVideo =
            Math.floor(time / 1000 / 60 / 60 / 24 / 30) + ' tháng trước';
    } else if (time > 86400000) {
        dateVideo = Math.floor(time / 1000 / 60 / 60 / 24) + ' ngày trước';
    } else if (time > 3600000) {
        dateVideo = Math.floor(time / 1000 / 60 / 60) + ' giờ trước';
    } else if (time > 60000) {
        dateVideo = ' vài phút trước';
    }
    return dateVideo;
};
