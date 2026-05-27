import mongoose from 'mongoose';

const workspaceSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    apiKey: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Workspace = mongoose.model('Workspace', workspaceSchema);
export default Workspace;
