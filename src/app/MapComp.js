/*global google*/

import React from "react"
import {compose, withProps} from "recompose"
import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from "react-google-maps"
import escapeRegExp from "escape-string-regexp";

const lat = 32.1500,
    lng = 34.8839;

const styles = {
    mapContainer: {
        padding: 0,
    }
};


const MapComp = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBUTQfI6CTeTw-g7tJwNbFLTy799wzRNeI&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{
            height: `100%`
        }}/>,
        containerElement: < div style={{
            height: `calc(100% - 64px)`
        }}/>,
        mapElement: < div style={{
            height: `100%`
        }}/>,
    }),
    withScriptjs,
    withGoogleMap)((props) => {
        const markerPin = {
            url: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
            scaledSize: new google.maps.Size(42, 43)
        };

        // Filter the location results
        const { isOpen, markers } = props;
        let showingLocations;

        if (props.filterQuery) {
            const match = new RegExp(escapeRegExp(props.filterQuery), 'i');
            showingLocations = markers.filter((location) => match.test(location.venue.name));
        } else {
            showingLocations = markers;
        }
        return (
            <GoogleMap styles={styles.mapContainer}
                       defaultZoom={11}
                       defaultCenter={{lat: lat, lng: lng}}>
                {showingLocations.map((marker) => {
                        return (
                            <Marker defaultIcon={markerPin}
                                    key={marker.venue.id}
                                    position={{lat: marker.venue.location.lat, lng: marker.venue.location.lng}}
                                    onClick={() => props.onToggleOpen(marker.venue.id)}
                                    animation={isOpen === marker.venue.id && google.maps.Animation.BOUNCE}>
                                {isOpen === marker.venue.id && (
                                    <InfoWindow onCloseClick={props.closeWindows}>
                                        <div>
                                            <h3>
                                                <strong><u>{marker.venue.name}</u></strong>
                                            </h3>
                                            <p>
                                                Category: <strong>{marker.venue.categories[0].name}</strong>
                                            </p>
                                            {marker.venue.photos.count > 0 && (
                                                <img src={marker.venue.photos.groups[0].url} alt={marker.venue.photos.groups[0].alt}/>
                                            )}
                                            <br />
                                            <p>Location information powered by <strong>Foursquare</strong></p>
                                        </div>
                                    </InfoWindow>)}
                            </Marker>
                        )
                    }
                )}
            </GoogleMap>
        )
    }
);

class MyFancyComponent extends React.PureComponent {
    state = {
        isMarkerShown: false
    };

    render() {
        return (<MapComp isMarkerShown={this.state.isMarkerShown}
                         markers={this.props.markers}
                         isOpen={this.props.isOpen}
                         onToggleOpen={this.props.onToggleOpen}
                         closeWindows={this.props.closeWindows}
                         filterQuery={this.props.filterQuery}
            />
        )
    }
}


// export default MapComp
export default MyFancyComponent