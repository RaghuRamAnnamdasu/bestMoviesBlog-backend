import { client } from "../index.js";
import {ObjectId} from "mongodb";

export async function updateMovieById(id, data) {
  return await client.db("node_app").collection("movies").updateOne({ _id: ObjectId(id) }, { $set: data });
}
export async function deleteMovieById(id) {
  return await client.db("node_app").collection("movies").deleteOne({ _id: ObjectId(id) });
}
export async function createMovie(data) {
  console.log("enteredAddMovie");
  return await client.db("node_app").collection("movies").insertOne(data);
}
export async function getMovieById(id) {
  return await client.db("node_app").collection("movies").findOne({ _id: ObjectId(id) });
}
export async function getAllMovies(req) {
  return await client.db("node_app").collection("movies").find(req.query).toArray();
}

export async function createUSer(data) {
  return await client.db("node_app").collection("users").insertOne(data);
}

export async function getUserByName(username) {
  return await client.db("node_app").collection("users").findOne({username : username});
}