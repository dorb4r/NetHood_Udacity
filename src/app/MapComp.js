import React from "react"
import {
    compose,
    withProps
} from "recompose"
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from "react-google-maps"

const lat = 32.1500,
      lng = 34.8839;

const styles = {
    mapContainer: {
        height: "calc(100% - 64px)",
        padding: 0,

    }
}

// // class MapComp extends Component {

// //     render() {
// //         const { apiKey } = this.props;
// //         return (
// //             <div style={styles.mapContainer}>
// //                 <GoogleMap bootstrapURLKeys={{
// //                             key: apiKey,
// //                             language: 'en',
// //                             region: 'il'
// //                             }}
// //                             defaultCenter={[lat, lng]}
// //                             defaultZoom={14}
// //                         />
// //             </div>
// //         )

// //     }
// // }


// // ######################################
// ######################################


const MapComp = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBUTQfI6CTeTw-g7tJwNbFLTy799wzRNeI&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style = {
            {
                height: `100%`
            }
        }
        />,
        containerElement: < div style = {
            {
                height: `calc(100% - 64px)`
            }
        }
        />,
        mapElement: < div style = {
            {
                height: `100%`
            }
        }
        />,
    }),
    withScriptjs,
    withGoogleMap)((props) => {
        return (<GoogleMap styles={styles.mapContainer}
            defaultZoom = {14}
            defaultCenter = {{lat: lat, lng: lng}}>
            {/* <Marker position={{lat: lat, lng: lng}}
                    onClick = {props.onMarkerClick}/> */}
            {props.markers.map((marker) => {
                console.log(marker.position.lng);
                return (<Marker key={marker.id} position={{lat: marker.position.lat, lng: marker.position.lon}}
                    onClick = {props.onMarkerClick}/>)
            }
                
           )}
    </GoogleMap>)
    }
    
    )

class MyFancyComponent extends React.PureComponent {
    state = {
        isMarkerShown: false,
    }

    componentDidMount() {
        this.delayedShowMarker()
    }

    delayedShowMarker = () => {
        setTimeout(() => {
            this.setState({
                isMarkerShown: true
            })
        }, 3000)
    }

    handleMarkerClick = () => {
        this.setState({
            isMarkerShown: false
        })
        this.delayedShowMarker()
    }

    render() {
        return ( <
            MapComp isMarkerShown = {
                this.state.isMarkerShown
            }
            onMarkerClick = {
                this.handleMarkerClick
            }
            />
        )
    }
}

export default MapComp