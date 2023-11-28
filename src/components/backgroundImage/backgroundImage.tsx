
import Styles from "./backgroundImage.module.css"

interface CoverImageProps {
    alt: string,
    imageSource: string
}

export default function BackgroundImage({alt, imageSource} : CoverImageProps) {
    return (
        <div className={Styles.container}>
            <img alt={alt} src={imageSource}/>
        </div>
    )
}