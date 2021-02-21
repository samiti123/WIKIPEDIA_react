import React from 'react';

export default function RandomArticle(props) {
    return (
        <div>
            <div dangerouslySetInnerHTML = {{ __html: props.data }} />
        </div>
    )
}
