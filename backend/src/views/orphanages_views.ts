import Orphanage from "../models/Orphanage";
import images_views from "./images_views";

export default {
    render(orphanage: Orphanage) {
        return {
            name: orphanage.name,
            latitude: orphanage.latitude,
            longitude: orphanage.longitude,
            about: orphanage.about,
            instructions: orphanage.instructions,
            opening_hours: orphanage.opening_hours,
            is_open_on_weekends: orphanage.is_open_on_weekends,
            images: images_views.renderMany(orphanage.images)
        }
    },
    renderMany(orphanages: Orphanage[]) {
        return orphanages.map(o => this.render(o))
    },
};