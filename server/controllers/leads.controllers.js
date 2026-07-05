import { createLeadSchema } from '../schemas/leads.schema.js';
import { findWorkspaceByUserId } from '../services/workspace.services.js';
import Leads from '../models/Leads.model.js';
import { updateLeadSchema } from '../schemas/updateLeadSchema.js';
import mongoose from 'mongoose';

export const createLeadsController = async (req, res) => {
  try {
    const workspace = req.workspace;
    if (!workspace)
      return res
        .status(404)
        .json({ success: false, message: 'workspace not found' });
    const result = createLeadSchema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.issues.map((err) => err.message);

      return res.status(400).json({
        success: false,
        message: errors,
      });
    }

    const lead = await Leads.create({
      workspace: workspace._id,
      ...result.data,
    });

    return res.status(201).json({
      success: true,
      message: 'Lead created successfully',
      lead,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: 'Something broke up!',
    });
  }
};

export const getLeadsController = async (req, res) => {
  try {
    const id = req.user.id;
    const page = Math.max(Number(req.query.page || 1), 1);
    const limit = Math.max(Number(req.query.limit || 10), 1);
    const skip = (page - 1) * limit;

    const workspace = await findWorkspaceByUserId(id);

    if (!workspace) {
      return res.status(404).json({
        success: false,
        message: 'No workspace found.',
      });
    }

    const leads = await Leads.find({
      workspace: workspace._id,
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalLeads = await Leads.countDocuments({ workspace: workspace._id });
    const totalPages = Math.ceil(totalLeads / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;
    return res.status(200).json({
      success: true,
      message: 'Leads fetched successfully',
      total: totalLeads,
      leads,
      currentPageLeads: leads.length,
      page,
      limit,
      totalPages,
      hasNextPage,
      hasPrevPage,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: 'Something broke up!',
    });
  }
};

export const getSingleLeadController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid lead id',
      });
    }

    const workSpace = await findWorkspaceByUserId(userId);

    if (!workSpace) {
      return res.status(404).json({
        success: false,
        message: 'No workspace found.',
      });
    }

    const lead = await Leads.findOne({
      _id: id,
      workspace: workSpace._id,
    });

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Lead fetched successfully',
      lead,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: 'Something broke up!',
    });
  }
};

export const updateLeadController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid lead id",
      });
    }

    const workspace = await findWorkspaceByUserId(req.user.id);

    if (!workspace) {
      return res.status(404).json({
        success: false,
        message: "Workspace not found",
      });
    }

    const result = updateLeadSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error.issues.map(i => i.message),
      });
    }

    const lead = await Leads.findOneAndUpdate(
      {
        _id: id,
        workspace: workspace._id,
      },
      result.data,
      {
        new: true,
      }
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    return res.json({
      success: true,
      message: "Lead updated",
      lead,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Something broke",
    });
  }
};


export const deleteLeadController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid lead id',
      });
    }

    const workspace = await findWorkspaceByUserId(req.user.id);

    if (!workspace) {
      return res.status(404).json({
        success: false,
        message: 'Workspace not found',
      });
    }

    const lead = await Leads.findOneAndDelete({
      _id: id,
      workspace: workspace._id,
    });

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Lead deleted successfully',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: 'Something broke up!',
    });
  }
};