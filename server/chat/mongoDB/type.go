package mongoDB

type userInfo struct {
	id          string `bson:"_id"`
	user_id     string `bson:"user_id"`
	nickname    string `bson:"nickname"`
	password    string `bson:"password"`
	profile_img string `bson:"profile_img,omitempty"`
}