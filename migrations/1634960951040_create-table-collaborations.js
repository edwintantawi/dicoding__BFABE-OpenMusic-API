exports.up = (pgm) => {
  pgm.createTable('collaborations', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    playlist_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  });

  // collaborations.playlist_id -> playlist.id
  pgm.createConstraint(
    'collaborations',
    'fk_collaborations.playlist_id_playlists.id',
    'FOREIGN KEY(playlist_id) REFERENCES playlists(id) ON DELETE CASCADE'
  );

  // collaborations.user_id -> users.id
  pgm.createConstraint(
    'collaborations',
    'fk_collaborations.user_id_users.id',
    'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE'
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint(
    'collaborations',
    'fk_collaborations.playlist_id_playlists.id'
  );
  pgm.dropConstraint('collaborations', 'fk_collaborations.user_id_users.id');
  pgm.dropTable('collaborations');
};
