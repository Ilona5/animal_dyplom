import tensorflow as tf

MODEL_PATH = "animal_model.h5"

model = tf.keras.models.load_model(MODEL_PATH)

CLASSES = ["Kot", "Krolik", "Papuga"]
