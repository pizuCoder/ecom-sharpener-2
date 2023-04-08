import plantImg from './assets/plant-homepage.webp'

export default function HomePage(){
    return(
        <div style={{width: "100%"}}>
            <img src={plantImg} alt="plant" style={{width: "100%"}}/>
        </div>
    )
}