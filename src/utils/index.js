/* eslint-disable camelcase */
const mapSongTableToModel = ({ inserted_at, updated_at, ...args }) => ({
  ...args,
  insertedAt: inserted_at,
  updatedAt: updated_at,
});

module.exports = { mapSongTableToModel };
