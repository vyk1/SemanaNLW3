import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Orphanages from "../models/Orphanage";
import orphanages_views from "../views/orphanages_views";
import * as Yup from 'yup'

export default {
    async show(req: Request, res: Response) {
        const { id } = req.params

        const oRepo = getRepository(Orphanages)
        const orphanage = await oRepo.findOneOrFail(id, {
            relations: ['images']
        })

        return res.json(orphanages_views.render(orphanage))
    },
    async index(req: Request, res: Response) {

        const oRepo = getRepository(Orphanages)
        const orphanages = await oRepo.find({
            relations: ['images']
        })

        return res.json(orphanages_views.renderMany(orphanages))
    },
    async create(req: Request, res: Response) {

        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            is_open_on_weekends
        } = req.body
        console.log(is_open_on_weekends)
        const oRepo = getRepository(Orphanages)

        const reqImgs = req.files as Express.Multer.File[]
        const images = reqImgs.map(img => {
            return { path: img.filename }
        })

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            is_open_on_weekends: is_open_on_weekends === "true",
            images
        }

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            is_open_on_weekends: Yup.boolean().required(),
            images: Yup.array(Yup.object().shape({
                path: Yup.string().required()
            })).required(),
        })

        await schema.validate(data, {
            abortEarly: false
        })

        const orphanage = oRepo.create(data)

        await oRepo.save(orphanage)

        return res.status(201).json(orphanage)
    }

};