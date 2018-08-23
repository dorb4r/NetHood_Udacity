import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'

import GoogleMap from 'google-map-react'


const lat = 32.1500,
      lng = 34.8839;

const styles = {
    mapContainer: {
        height: "calc(100% - 64px)",
        padding: 0,
        
    }
}

class MapComp extends Component {
    render() {
        const { apiKey } = this.props;
        return (
            <div style={styles.mapContainer}>
                <GoogleMap bootstrapURLKeys={{
                            key: apiKey,
                            language: 'en',
                            region: 'il'
                            }}
                            defaultCenter={[lat, lng]}
                            defaultZoom={10}
                        />
            </div>
        )
        
    }
}

export default withStyles(styles, {withTheme: true})(MapComp)