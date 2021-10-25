exports.up = (pgm) => {
  pgm.createTable('playlistsongs', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    playlist_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    song_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  });

  // playlistsongs.playlist_id -> playlists.id
  pgm.createConstraint(
    'playlistsongs',
    'fk_playlistsongs.playlist_id_playlists.id',
    'FOREIGN KEY(playlist_id) REFERENCES playlists(id) ON DELETE CASCADE'
  );

  // playlistsongs.song_id -> songs.id
  pgm.createConstraint(
    'playlistsongs',
    'fk_playlistsongs.song_id_songs.id',
    'FOREIGN KEY(song_id) REFERENCES songs(id) ON DELETE CASCADE'
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint(
    'playlistsongs',
    'fk_playlistsongs.playlist_id_playlists.id'
  );
  pgm.dropConstraint('playlistsongs', 'fk_playlistsongs.song_id_songs.id');
  pgm.dropTable('playlistsongs');
};
