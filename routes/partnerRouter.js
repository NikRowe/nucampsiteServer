const express = require('express');
const bodyParser = require('body-parser');
const Partner = require('../models/partner')

const partnerRouter = express.Router();

partnerRouter.use(bodyParser.json());

partnerRouter.route('/')
    .get((req, res, next) => {
        Promotion.find()
            .then(promotions => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json')
                res.json(promotions)
            })
            .catch(err => next(err))
    })
    .post((req, res, next) => {
        Promotion.create(req.body)
            .then(promotion => {
                console.log('Promotion Created ', promotion)
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json')
                res.json(promotion)
            })
            .catch(err => next(err))
    })
    .put((req, res) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /partners');
    })
    .delete((req, res, next) => {
        Promotion.deleteMany()
            .then(response => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json')
                res.json(response)
            })
            .catch(err => next(err))
    });

partnerRouter.route('/:partnerId')
    .get((req, res, next) => {
        Promotion.findById(req.params.promotionId)
            .then(promotion => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json')
                res.json(promotion)
            })
            .catch(err => next(err))
    })
    .post((req, res) => {
        res.statusCode = 403;
        res.end(`POST operation not supported on /partners/${req.params.partnerId}`);
    })
    .put((req, res, next) => {
        Promotion.findByIdAndUpdate(req.params.promotionId, {
            $set: req.body
        }, { new: true })
            .then(promotion => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json')
                res.json(promotion)
            })
            .catch(err => next(err))
    })
    .delete((req, res, next) => {
        Campsite.findByIdAndDelete(req.params.promotionId)
            .then(response => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json')
                res.json(response)
            })
            .catch(err => next(err))
    });



module.exports = partnerRouter;