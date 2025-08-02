document.getElementById('uploadForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const subject = document.getElementById('subject').value;
  const file = document.getElementById('file').files[0];

  const storageRef = storage.ref('notes/' + file.name);
  await storageRef.put(file);
  const fileURL = await storageRef.getDownloadURL();

  await db.collection('notes').add({
    title,
    subject,
    fileURL,
    uploadedAt: firebase.firestore.FieldValue.serverTimestamp()
  });

  alert("Note uploaded!");
  document.getElementById('uploadForm').reset();
});
